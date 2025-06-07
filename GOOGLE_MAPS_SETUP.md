# Google Maps API 設定指南

## 概述

本專案使用 Google Maps API 來顯示餐廳位置和相關資訊。以下是正確的設定和使用方式。

## 環境變數設定

### 1. 建立 `.env.local` 檔案

在專案根目錄建立 `.env.local` 檔案：

```bash
# API 配置
NEXT_PUBLIC_API_BASE_URL=https://suspendedmealbackend.zeabur.app

# Google Maps API 金鑰
NEXT_PUBLIC_GOOGLE_MAPS_API=your_google_maps_api_key_here
```

### 2. 取得 Google Maps API 金鑰

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案或選擇現有專案
3. 啟用以下 API：
   - Maps JavaScript API
   - Places API (如果需要)
4. 建立 API 金鑰
5. 設定 API 金鑰限制（建議限制網域）

## 程式碼架構

### 主要元件

#### 1. GoogleMap.js

- 主要地圖元件
- 使用 `@vis.gl/react-google-maps` 套件
- 處理地圖載入和錯誤狀態
- 轉換用戶資料為地圖標記格式

#### 2. PoiMarkers.js

- 地圖標記元件
- 顯示餐廳位置標記
- 處理標記點擊和資訊視窗
- 整合產品資訊顯示

#### 3. useUserLocations.js

- 自訂 Hook，用於獲取用戶位置資料
- 包含完整的錯誤處理和資料驗證
- 支援多種位置資料格式

#### 4. useProductDisplay.js

- 自訂 Hook，用於獲取產品資料
- 與用戶位置資料整合
- 提供產品資訊給地圖標記

## 資料結構

### 用戶位置資料格式

```javascript
{
  _id: "user_id",
  name: "餐廳名稱",
  username: "用戶名稱",
  secret: "密碼提示",
  latitude: 25.0330,    // 或使用 lnglat.lat
  longitude: 121.5654,  // 或使用 lnglat.lng
  lnglat: {             // 替代格式
    lat: 25.0330,
    lng: 121.5654
  }
}
```

### 產品資料格式

```javascript
{
  _id: "product_id",
  name: "產品名稱",           // 或 title, productName
  userID: "user_id",         // 或 userId, user
  price: 100,
  dailyQuantity: 5,          // 或 quantity
  campaignExpiration: "2024-12-31T00:00:00.000Z"
}
```

## 錯誤處理

### 常見錯誤和解決方案

1. **API 金鑰錯誤**

   - 檢查 `.env.local` 檔案是否正確設定
   - 確認 API 金鑰有效且已啟用相關服務

2. **CORS 錯誤**

   - 確認後端 API 已設定正確的 CORS 政策
   - 檢查 API_BASE_URL 是否正確

3. **資料格式錯誤**

   - 檢查後端回應的資料格式
   - 確認位置資料包含有效的經緯度

4. **地圖載入失敗**
   - 檢查網路連線
   - 確認 Google Maps API 配額未超限

## 除錯工具

### Console 日誌

程式碼包含詳細的 console.log，可在瀏覽器開發者工具中查看：

- `GoogleMap - *`: 地圖元件相關日誌
- `PoiMarkers - *`: 標記元件相關日誌
- `useUserLocations - *`: 用戶資料獲取日誌
- `useProductDisplay - *`: 產品資料獲取日誌

### 瀏覽器開發者工具

1. 開啟 F12 開發者工具
2. 查看 Console 標籤頁的錯誤訊息
3. 檢查 Network 標籤頁的 API 請求狀態
4. 使用 Elements 標籤頁檢查地圖元素

## 效能最佳化

### 建議事項

1. 使用 React.useMemo 快取計算結果
2. 避免在 render 中進行複雜計算
3. 適當設定地圖的 zoom 和 center
4. 限制同時顯示的標記數量

### 記憶體管理

- 正確清理事件監聽器
- 避免記憶體洩漏
- 適當使用 useEffect 的清理函數

## 部署注意事項

### Vercel 部署

1. 在 Vercel 專案設定中加入環境變數
2. 確認 API 金鑰在生產環境中有效
3. 設定適當的網域限制

### 安全性

- 不要在客戶端程式碼中暴露敏感資訊
- 使用環境變數管理 API 金鑰
- 設定 API 金鑰的使用限制

## 故障排除

如果遇到問題，請按以下順序檢查：

1. 檢查 `.env.local` 檔案設定
2. 確認 Google Maps API 金鑰有效
3. 檢查後端 API 是否正常運作
4. 查看瀏覽器 Console 的錯誤訊息
5. 檢查網路連線和 CORS 設定

## 聯絡支援

如需進一步協助，請提供：

- 錯誤訊息截圖
- 瀏覽器 Console 日誌
- 網路請求詳細資訊
- 環境設定資訊（去除敏感資料）
