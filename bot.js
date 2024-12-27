// Tải các biến môi trường từ file `.env`
require('dotenv').config();
// Import thư viện Telegram Bot API để làm việc với bot Telegram
const TelegramBot = require('node-telegram-bot-api');
// Import thư viện Express để xử lý các yêu cầu HTTP (mặc dù chưa dùng nhưng có thể cần trong tương lai)
const express = require('express');

// Lấy token của bot Telegram từ biến môi trường
// Thay đổi giá trị BOT_TOKEN trong file .env để dùng token của bot mới
const BOT_TOKEN = process.env.BOT_TOKEN;
// Kiểm tra nếu BOT_TOKEN không được thiết lập, in lỗi và thoát chương trình
if (!BOT_TOKEN) {
    // In thông báo lỗi
    console.error("Error: BOT_TOKEN is not set in environment variables.");
    // Thoát chương trình với mã lỗi 1
    process.exit(1); // Exit the app if the token is missing
}
// Tạo một đối tượng bot Telegram và bật chế độ polling để bot nhận tin nhắn từ người dùng
// Tạo một bot Telegram mới với token đã thay đổi
// Đảm bảo token mới được sử dụng khi tạo bot
const bot = new TelegramBot(BOT_TOKEN, { polling: true });
// Tạo một ứng dụng Express để lắng nghe các yêu cầu HTTP
const app = express();
// Xử lý khi người dùng gửi lệnh /start đến bot
bot.onText(/\/start/, (msg) => {
    // Lấy ID của cuộc trò chuyện để gửi tin nhắn phản hồi
    const chatId = msg.chat.id;
    // Gửi tin nhắn kèm theo nút
    bot.sendMessage(chatId, 'Click the button to play the game!', {
        // Thêm bàn phím tùy chỉnh vào tin nhắn
        reply_markup: {
            // Tạo bàn phím với các nút
            inline_keyboard: [
                [
                     // Văn bản trên nút
                    // URL web app khi nhấn nút
                    // Thay đổi URL sang trang web mới
                    { text: 'Play opBNB Disk Frenzy Telegram Game', web_app: { url: 'https://itch.io/embed-upload/12348255?color=333333' } }
                ]
            ]
        }
    });
});
// Khởi chạy ứng dụng Express trên cổng 3000
app.listen(3000, () => console.log('Bot is running on port 3000'));
