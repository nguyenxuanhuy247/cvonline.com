import { BsArrowRight } from 'react-icons/bs';
import { FaUserTie } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';
import { MdOutlineLanguage } from 'react-icons/md';

export const MENU_AVATAR_DATA = [
    {
        id: 11,
        leftIcon: <FaUserTie />,
        title: 'Tài khoản',
        rightIcon: <BsArrowRight />,
        route: '/account',
        children: {
            title: 'Thiết lập mật khẩu',
            isSetPassword: true,
        },
    },
    {
        id: 12,
        leftIcon: <MdOutlineLanguage />,
        title: 'Tiếng Việt',
        rightIcon: <BsArrowRight />,
        separate: true,
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    id: 21,
                    title: 'Tiếng Việt',
                },
                {
                    id: 22,
                    title: 'Tiếng Anh (đang cập nhật...)',
                },
            ],
        },
    },
    {
        id: 13,
        leftIcon: <MdOutlineLogout />,
        title: 'Đăng xuất',
        rightIcon: <BsArrowRight />,
    },
];
