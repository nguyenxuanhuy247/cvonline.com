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
            attributes: ['fullName', 'avatar', 'jobPosition', 'email', 'gmailPassword'],
            raw: true,
        });

        if (user && user.gmailPassword) {
            const avatar = user.avatar;
            const binaryAvatar = avatar?.toString('binary');

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: user.email,
                    pass: user.gmailPassword,
                },
            });

            console.log('AAAAAAAAAAA', user);
            console.log('BBBBBBBBBBB', binaryAvatar);

            const html = await ejs.renderFile('./src/views/cv-email.ejs', {
                fullName: user.fullName,
                avatar: binaryAvatar,
            });

            // send mail with defined transport object
            await transporter.sendMail({
                from: `"Ứng viên ${user.fullName}" <no-reply@cvonline.com.vn>`,
                to: employerEmail,
                subject: subject,
                text: subject,
                attachments: [{ path: binaryAvatar, cid: 'avatar' }],
                html: `<body style="font-size: 16px; box-sizing: border-box; margin: 0; padding: 0;">
                <div style="padding: 20px;">
                  <p style="text-align: center; font-size: 24px; font-weight: 600;">
                    THƯ ỨNG TUYỂN
                  </p>
                  <div style="display: flex;">
                    <div
                      style="display: flex; flex-direction: column; align-items: center;"
                    >
                      <img
                        src="https://vinfastotominhdao.vn/wp-content/uploads/VinFast-VF3-mau-xanh-do-1110x644.jpg"
                        style="width: 40px; height: 40px; border-radius: 50%;"
                        alt="Image"
                      />
                      <span>Nguyễn Xuân Huy</span>
                      <span>Fullstack developer</span>
                    </div>
                    <div>
                      <p>Thông tin liên hệ</p>
                      <div>
                        <p>Số điện thoại / Zalo :</p>
                        <p>0356 118 188</p>
                      </div>
                      <div>
                        <p>Email :</p>
                        <p>nguyenxuanhuy24071993@gmail.com</p>
                      </div>
                      <span>Front-end developer</span>
                    </div>
                  </div>
            
                  <div>
                    <p>Kính gửi: Bộ phận nhân sự Công ty TNHH ABCC</p>
                    <p>Đồng kính gửi: Trưởng phòng Công nghệ, Ban giám đốc công ty</p>
                    <p>Hà Nội, Ngày 26 tháng 08 năm 2023</p>
                  </div>
                  <div>
                    <p>
                      Thông qua …, tôi được biết Quý Công ty đang cần tuyển vị trí [Tên vị
                      trí công việc]. Tôi mong muốn được thử sức mình trong môi trường làm
                      việc hết sức năng động của Quý Công ty. Với trình độ và kinh nghiệm
                      hiện có, tôi tự tin có thể đảm nhiệm tốt vai trò này tại công ty [Tên
                      công ty].
                    </p>
            
                    <p>
                      Tôi xin gửi Quý Công ty sản phẩm cá nhân, mong công ty xem xét và đánh
                      giá
                    </p>
            
                    <div style="text-align: center;">
                      <a>Trang CV của tôi</a>
                    </div>
            
                    <p>
                      Tôi mong nhận được đánh giá của Quý công ty về sản phẩm của tôi. Nếu
                      thiếu kiến thức và công nghệ nào, mong công ty phản hồi để tôi có thể
                      hoàn thiện hơn sản phẩm của mình.
                    </p>
                    <p>Trân trọng. Xin cảm ơn!</p>
            
                    <p>
                      -- Thư này được gửi bởi cvonline.com - sản phẩm cá nhân của Nguyễn
                      Xuân Huy --
                    </p>
                  </div>
                </div>
              </body>`,
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
