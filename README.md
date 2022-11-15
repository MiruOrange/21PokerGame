# <p align="center">21PokerGame</p>
## <p align="center">以Javascript及jQuery撰寫的21點樸克牌遊戲</p>
- 使用技術
  - DOM實作
    - 使所有牌組背面出現客製化"火"字樣
    - 按下"開始新遊戲"按鈕後，牌局初始化，玩家兩張牌，莊家一張牌，
    - 隨著玩家要牌或不要牌，逐一變化牌面。
    - "要牌"及"不要牌了"等兩個按鈕，在遊戲開始或勝負已定時，都會disabled；反之，則不會disabled
  - 物件導向實作
    - 建立一個Cards的類別，內建牌面花色及卡牌點數等兩個屬性，及cardPoint()、cardSuit()及cardNumber()等三個方法
    - cardPoint()，可用來回傳卡牌點數，用以計算分數，判斷輸贏。
    - cardSuit()，可用來回傳卡牌花色，用以判斷是紅心、黑桃、方塊或梅花。
    - cardNumber()，可用來特別處理1、11、12、13等數字的特殊顯示方式為A、J、Q、K
  - Fisher-Yates 演算法實作
    - 撰寫shuffle()函式，讓建立的52張卡牌陣列能亂數洗牌後，再放回陣列
### 遊戲初始畫面
![image](https://user-images.githubusercontent.com/109893487/201807264-538c9b24-4aa3-480c-8c2d-dd85ae71810f.png)
### 按下開始新遊戲按鈕後
![image](https://user-images.githubusercontent.com/109893487/201809064-a0e16d86-cb4b-4461-9442-daa58dd5fe6d.png)
### 玩家點選"要牌"按鈕，直到爆掉為止(超過21點)
![image](https://user-images.githubusercontent.com/109893487/201809357-8c4639bf-18eb-4034-93c2-e492e4055da8.png)
### 玩家點選"不要牌了"按鈕，電腦會自動發牌給自己，直到獲勝、平手或爆掉為止
![image](https://user-images.githubusercontent.com/109893487/201809682-1fb5859e-6b57-40f4-86d1-ea4ea2fc3f59.png)




