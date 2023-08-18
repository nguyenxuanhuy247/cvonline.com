import db from '~/models';
require('dotenv').config();
const nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');

// RESET PASSWORD
export const handleSendEmailResetPassword = async (data) => {
    try {
        const { email: receiverEmail } = data;

        const user = await db.users.findOne({
            where: { email: receiverEmail },
            attributes: ['email'],
            raw: true,
        });

        if (user) {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"cvonline.com" <no-reply@cvonline.com.vn>',
                to: receiverEmail,
                subject: 'Reset mật khẩu',
                text: 'Reset mật khẩu',
                html: `<div style="font-size:16px;color:#500050">
                <h3>Bạn vừa gửi yêu cầu đặt lại mật khẩu?</h3>
                <p>Click vào link sau để đặt lại mật khẩu: <a href='http://localhost:2407/forgot-password' style="color:#00b14f;text-decoration:underline">https://www.topcv.vn/reset-password/8b4644f92d8516937a4435fd407e6744356ebe4030ea4059ec1a52ae800ec399</a></p>
              
                <p>Nếu không phải bạn đã gửi yêu cầu đặt lại mật khẩu, xin hãy bỏ qua email này.</p>
                <p>Nếu có bất kì thắc mắc nào, vui lòng liên hệ <a href="mailto:nguyenxuanhuy.yukai@example.com" style="color:#00b14f;text-decoration:underline;" target="_blank">hotro@cvonline.com</a> để nhận được hỗ trợ.</p>
              
                <p>Cảm ơn bạn đã sử dụng dịch vụ.</p>
              
                <p>CVonline</p>
              
                <p style="font-size:14px;font-style:italic;text-align:center;display:block;color:#888">-- Đây là email tự động. Xin bạn vui lòng không gửi phản hồi vào hộp thư này --</p>
              </div>`,
            });

            return {
                errorCode: 0,
                errorMessage: `Email đặt lại mật khẩu đã được gửi`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Email không tồn tại trong hệ thống`,
            };
        }
    } catch (error) {
        console.log('An error in handleVerifyUserID() in appService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Xác thực ID người dùng thất bại`,
        };
    }
};

// main().catch(console.error);
