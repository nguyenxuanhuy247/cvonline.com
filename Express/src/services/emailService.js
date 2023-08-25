import db from '~/models';
require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const ejs = require('ejs');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
import express from 'express';

// RESET PASSWORD
export const handleSendEmailResetPassword = async (data) => {
    try {
        const { email: receiverEmail } = data;

        const user = await db.users.findOne({
            where: { email: receiverEmail },
            attributes: ['id', 'email', 'password', 'gmailPassword'],
            raw: true,
        });

        if (user) {
            const JWT_SECRET = 'reset password';
            const secret = JWT_SECRET + user.password;
            const payload = { id: user.id, email: user.email };
            var token = jwt.sign(payload, secret, { expiresIn: '10h' });
            const link = `${process.env.EXPRESS_URL}/reset-password/${user.id}/${token}`;

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            console.log('transporter', transporter);

            // send mail with defined transport object
            await transporter.sendMail({
                from: '"cvonline.com" <no-reply@cvonline.com.vn>',
                to: receiverEmail,
                subject: 'Đặt lại mật khẩu',
                text: 'Đặt lại mật khẩu',
                html: `<div style="font-size:16px;color:#500050">
                <h3>Bạn vừa gửi yêu cầu đặt lại mật khẩu?</h3>
                <p>Click vào link sau để đặt lại mật khẩu: <a href=${link} style="color:#00b14f;text-decoration:underline">${link}</a></p>
              
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
        console.log('An error in handleSendEmailResetPassword() in emailService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Không gửi được email đặt lại mật khẩu`,
        };
    }
};

// =========================================================================
// SEND CV VIA EMAIL
export const handleSendCVViaEmail = async (data) => {
    try {
        const { from, employerEmail, subject } = data;

        const user = await db.users.findOne({
            where: { email: from },
            attributes: ['fullName', 'email', 'gmailPassword'],
            raw: true,
        });

        if (user && user.gmailPassword) {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: user.email,
                    pass: user.gmailPassword,
                },
            });

            const css = await readFile('./src/public/css/reset-password.css', 'utf8');
            const html = await ejs.renderFile('./src/views/cv-email.ejs', {
                errorCode: 1,
                errorMessage: '',
                values: { password: '', confirmedPassword: '' },
                css: css,
            });

            const app = express();
            app.use(express.static('./src/public/css'));
            // send mail with defined transport object
            await transporter.sendMail({
                from: `"Ứng viên ${user.fullName}" <no-reply@cvonline.com.vn>`,
                to: employerEmail,
                subject: subject,
                text: subject,
                html: html,
            });

            return {
                errorCode: 0,
                errorMessage: `Email ứng tuyển đã được gửi tới nhà tuyển dụng`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Email không tồn tại trong hệ thống`,
            };
        }
    } catch (error) {
        console.log('An error in handleSendCVViaEmail() in emailService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Không gửi được CV qua email`,
        };
    }
};
