import db from '~/models';
require('dotenv').config();
const nodemailer = require('nodemailer');

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
                subject: 'Reset mật khẩu', // Subject line
                text: 'Hello world?', // plain text body
                html: `<h3>Bạn vừa gửi yêu cầu đặt lại mật khẩu?</h3>
                <p>Click vào link sau để đặt lại mật khẩu: <a>https://www.topcv.vn/reset-password/8b4644f92d8516937a4435fd407e6744356ebe4030ea4059ec1a52ae800ec399</a></p>
                
                <p>Nếu không phải bạn đã gửi yêu cầu đặt lại mật khẩu, xin hãy bỏ qua email này.</p>
                <p>Nếu có bất kì thắc mắc nào, vui lòng liên hệ hotro@cvonline.com.vn để nhận được hỗ trợ.</p>
                
                <p>Cảm ơn bạn đã sử dụng dịch vụ.</p>
                
                <p>cvonline.com</p>
                
                <p>-- Đây là email tự động. Xin bạn vui lòng không gửi phản hồi vào hộp thư này --</p>`,
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
