import db from '~/models';
require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

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
            const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
            const payload = { id: user.id, email: user.email };
            var token = jwt.sign(payload, secret, { expiresIn: '10h' });
            const link = `${process.env.EXPRESS_BACKEND_URL}/reset-password/${user.id}/${token}`;

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            try {
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
              
                <p>Team CV online</p>
              
                <p style="font-size:14px;text-align:center;display:block;color:#888">--- Đây là email tự động. Xin bạn vui lòng không gửi phản hồi vào hộp thư này ---</p>
              </div>`,
                });

                return {
                    errorCode: 0,
                    errorMessage: `Email đặt lại mật khẩu đã được gửi`,
                };
            } catch (error) {
                console.log('An error in NODEMAILER in handleSendEmailResetPassword() in emailService.js : ', error);

                return {
                    errorCode: 31,
                    errorMessage: `Lỗi Server! Không kết nối được với hệ thống gửi email ☹️`,
                };
            }
        } else {
            return {
                errorCode: 32,
                errorMessage: `Email này chưa được đăng ký`,
            };
        }
    } catch (error) {
        console.log('An error in handleSendEmailResetPassword() in emailService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không gửi được email để đặt lại mật khẩu ☹️`,
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

            try {
                const transporter = await nodemailer.createTransport({
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
                    attachments: [
                        { path: binaryAvatar, cid: 'avatar' },
                        { path: './src/public/img/cv-ung-vien.png', cid: 'logo' },
                    ],
                    html: `<div style="background-color: #f3f3f3; padding: 24px 0 80px; ">
                <a href="${
                    process.env.EXPRESS_FRONTEND_URL
                }" target="_blank" rel="noreferrer" style="text-decoration: none;">
                  <img src="cid:logo" alt="${user.fullName}"
                    style="  
                      display: block;
                      width: 300px;
                      max-width: calc(100% - 24px);
                      margin: 0 auto 24px;
                    "
                  />
                </a>
                <table style="width: 740px; margin: 0 auto; background-color: #fff; padding: 20px 46px; font-size: 15px;">
                <tbody style="color: #444;">
                  <tr>
                    <td>
                      <p
                        style=" 
                          margin-bottom: 16px;   
                          color: #000;
                          font-size: 24px;
                          font-weight: 700;
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
                          padding: 16px 24px;
                          background: #f4e8f8;
                          border-radius: 16px;
                        "
                      >
                        <tbody>
                          <tr>
                            <td style="width: 200px; display: flex; align-items: center; justify-content: center; padding: 0;">
                              <img
                                src="cid:avatar"
                                alt="Ảnh đại diện"
                                style="    
                                  width: 180px;
                                  height: 180px;
                                  border-radius: 50%;
                                  object-fit: cover;
                                  border: 1px solid #ccc;
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
                                  margin: 4px 0 8px;
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
                                  width: fit-content;
                                  margin: 12px 0 4px;
                                  padding: 4px 16px;
                                  font-size: 18px;
                                  font-weight: 700;
                                  line-height: 1.4;
                                  color: #ff881d;
                                  background-color: #faf6c6;
                                  border-radius: 30px;
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
                                      <span style="font-weight: 600;"
                                        >Số điện thoại</span
                                      >
                                      <span>:</span>
                                      <span>${user.phoneNumber || 'Không có'}</span>
                                    </td>
                                  </tr>
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
                                      <span style="font-weight: 600;"
                                        >Email</span
                                      >
                                      <span>:</span>
                                      <a href="mailto:${
                                          user.email
                                      }" style="text-decoration: none; word-break: break-all; color: #496c92;">${
                        user.email || 'Không có'
                    }</a>
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
                        style="margin-top: 20px; font-weight: 700;"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <p style="margin: 0;">
                                Kính gửi : Trưởng phòng nhân sự ${data.companyName}.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p style="margin: 0;">
                                Đồng kính gửi : Bộ phận nhân sự, Trưởng phòng Công nghệ,
                                Ban giám đốc Quý công ty.
                              </p>
                            </td>
                          </tr>
          
                          <tr>
                            <td>
                              <p style="margin: 0;">
                                Hà Nội, ngày ${String(new Date().getDate())} tháng
                                ${String(new Date().getMonth() + 1)} năm ${String(new Date().getFullYear())}.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 8px 0;">
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Thông qua
                        ${data.source}, tôi được biết Quý công ty đang cần tuyển vị trí
                        ${data.jobTitle}. Sau khi tìm hiểu yêu cầu công việc, tôi nhận
                        thấy mình có đủ năng lực để đảm nhận vị trí công việc này. Với
                        trình độ của mình, tôi mong muốn được đóng góp vào sự phát triển
                        của Quý công ty.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 8px 0;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tôi xin gửi Quý Công ty bản CV mô tả
                        chi tiết kinh nghiệm và những sản phẩm tôi đã làm được. Tôi rất
                        mong công ty xem xét và đánh giá.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style="text-align: center; margin: 16px;">
                        <a
                          style="
                            display: inline-block;
                            text-decoration: none;
                            min-width: 200px;
                            max-width: 100%;
                            padding: 10px;
                            font-size: 16px;
                            font-weight: 600;
                            border: none;
                            color: #fff;
                            background-color: #49b253;
                            border-radius: 4px;
                            cursor: pointer;
                          "
                          href="${process.env.EXPRESS_FRONTEND_URL}/${user.id}"
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
                      <p style="margin: 8px 0;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trang CV online này là sản phẩm cá
                        nhân của tôi. Tôi rất mong nhận được những đánh giá khách quan về sản phẩm của mình. 
                        Mong Quý công ty giúp tôi chỉ ra những thiếu xót để tôi có thể hoàn thiện sản phẩm hơn.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 8px 0;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Xin trân trọng cảm ơn.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p
                        style="
                          margin-top: 40px;
                          font-size: 14px;
                          text-align: center;
                          color: #888;
                        "
                      >
                        *** Email được gửi bởi <a href="${process.env.EXPRESS_FRONTEND_URL}" target="_blank"
                        rel="noreferrer" style="text-decoration: none;">cvonline.com</a> - sản phẩm của Nguyễn Xuân Huy
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
            } catch (error) {
                console.log('An error in NODEMAILER in handleSendCVByEmail() in emailService.js : ', error);

                return {
                    errorCode: 31,
                    errorMessage: `Lỗi Server! Không kết nối được với hệ thống gửi email ☹️`,
                };
            }
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
            errorMessage: `Lỗi Server! Không thể gửi CV tới nhà tuyển dụng ☹️`,
        };
    }
};
