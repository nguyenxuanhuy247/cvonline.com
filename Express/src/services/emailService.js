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
export const handleSendCVByEmail = async (data) => {
    try {
        const user = await db.users.findOne({
            where: { email: data.from },
            attributes: ['id', 'fullName', 'phoneNumber', 'avatar', 'jobPosition', 'email', 'gmailPassword'],
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

            // send mail with defined transport object
            await transporter.sendMail({
                from: `"Ứng viên ${user.fullName}" <no-reply@cvonline.com.vn>`,
                to: data.to,
                subject: data.subject,
                text: data.subject,
                attachments: [{ path: binaryAvatar, cid: 'avatar' }],
                html: `<div style="background-color: #f3f3f3; padding: 50px 0; ">
                <table style="width: 700px; margin: 0 auto; background-color: #fff; padding: 20px 46px; font-size: 15px;">
                <tbody style="color: #496c92;">
                  <tr>
                    <td>
                      <p
                        style="
                          font-size: 24px;
                          font-weight: 600;
                          text-align: center;
                          text-transform: uppercase;
                        "
                      >
                        THƯ ỨNG TUYỂN VỊ TRÍ ${user.jobPosition}
                      </p>
                    </td>
                  </tr>
          
                  <tr>
                    <td>
                      <table
                        style="
                          width: 100%;
                          padding: 20px;
                          background: #f4e8f8;
                          border-radius: 20px;
                        "
                      >
                        <tbody>
                          <tr>
                            <td style="width: 220px;">
                              <img
                                src="cid:avatar"
                                alt="${user.fullName}"
                                style="
                                  width: 200px;
                                  height: 200px;
                                  border-radius: 50%;
                                  object-fit: cover;
                                "
                              />
                            </td>
                            <td style="margin-left: 20px;">
                              <p
                                style="
                                  margin: 0;    
                                  font-size: 22px;
                                  font-weight: 700;
                                  line-height: 1.4;
                                  text-transform: uppercase;
                                  color: #ff881d;
                                "
                              >
                                ${user.fullName}
                              </p>
                              <p
                                style="
                                  margin: 8px 0;
                                  font-size: 20px;
                                  line-height: 1.4;
                                  font-weight: 700;
                                  color: #496c92;
                                "
                              >
                                ${user.jobPosition}
                              </p>
                              <p
                                style="
                                  margin: 12px 0;
                                  padding: 5px 10px;
                                  font-size: 18px;
                                  font-weight: 700;
                                  line-height: 1.4;
                                  color: #ff881d;
                                  background-color: #faf6c6;
                                  border-radius: 12px;
                                "
                              >
                                Thông tin liên hệ
                              </p>
          
                              <table>
                                <tbody>
                                  <tr>
                                    <td
                                      style="
                                        margin-top: 4px;
                                        margin-left: 16px;
                                        color: #496c92;
                                        display: flex;
                                        column-gap: 8px;
                                      "
                                    >
                                      <span style="min-width: 100px; font-weight: 600;"
                                        >Số điện thoại</span
                                      >
                                      <span>:</span>
                                      <span>${user.phoneNumber}</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style="
                                        margin-top: 4px;
                                        margin-left: 20px;
                                        color: #496c92;
                                        display: flex;
                                        column-gap: 8px;
                                      "
                                    >
                                      <span style="min-width: 100px; font-weight: 600;"
                                        >Email</span
                                      >
                                      <span>:</span>
                                      <span style="word-break: break-all;">${user.email}</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
          
                  <tr>
                    <td>
                      <table
                        style="margin-top: 20px; margin-left: 20px; font-weight: 700;"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <p style="margin: 0;">
                                Kính gửi : Trưởng phòng nhân sự công ty ABC
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p style="margin: 0;">
                                Đồng kính gửi : Bộ phận nhân sự, Trưởng phòng Công nghệ,
                                Ban giám đốc Quý công ty
                              </p>
                            </td>
                          </tr>
          
                          <tr>
                            <td>
                              <p style="margin: 0;">
                                Hà Nội, ngày ${String(new Date().getDate())} tháng
                                ${String(new Date().getMonth() + 1)} năm ${String(new Date().getFullYear())}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 8px;">
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Thông qua
                        ${data.source}, tôi được biết Quý Công ty đang cần tuyển vị trí
                        ${data.jobTitle}. Sau khi tìm hiểu yêu cầu công việc, tôi nhận
                        thấy mình có đủ năng lực để đảm nhận vị trí công việc này. Với
                        trình độ của mình, tôi mong muốn được đóng góp vào sự phát triển
                        của Quý công ty.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 8px;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tôi xin gửi Quý Công ty bản CV mô tả
                        chi tiết kinh nghiệm và những sản phẩm tôi đã làm được. Tôi rất
                        mong công ty xem xét và đánh giá.
                        <strong style="font-weight: 600; color: red;">
                          (Xin vui lòng ấn vào nút bên dưới)</strong
                        >
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style="text-align: center; margin: 16px;">
                        <a
                          style="
                            text-decoration: none;
                            min-width: 100px;
                            padding: 10px;
                            font-size: 16px;
                            font-weight: 600;
                            border: none;
                            color: #fff;
                            background-color: #49b253;
                            border-radius: 4px;
                            cursor: pointer;
                          "
                          href="${process.env.REACT_URL}/user.id"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Trang CV của tôi
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 8px;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trang CV Online này là sản phẩm cá
                        nhân của tôi. Tôi rất mong nhận được những đánh giá chân thực và
                        thiếu xót về sản phẩm này từ của Quý công ty để tôi có thể hoàn
                        thiện sản phẩm hơn.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 8px;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Xin trân trọng cảm ơn.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p
                        style="
                          margin-top: 8px;
                          font-size: 14px;
                          text-align: center;
                          color: #555;
                        "
                      >
                        *** Email được gửi bởi cvonline.com - sản phẩm của Nguyễn Xuân Huy
                        ***
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
                
                `,
            });

            return {
                errorCode: 0,
                errorMessage: `CV của bạn đã được gửi tới nhà tuyển dụng`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Email không tồn tại trong hệ thống`,
            };
        }
    } catch (error) {
        console.log('An error in handleSendCVByEmail() in emailService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] CV của bạn không thể gửi tới nhà tuyển dụng`,
        };
    }
};
