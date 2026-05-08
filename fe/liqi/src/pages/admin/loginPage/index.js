import { memo } from "react";
import "./style.scss";
import Title from "pages/users/theme/title";


const LoginAdminPage = () => {
    
    return (
        <div className="login__admin">
            <div className="login__admin__box">
                <Title name="TRUY CẬP HỆ THỐNG QUẢN TRỊ"/>

                <form>
                    <input type="text" placeholder="Tên đăng nhập"/>
                    <input type="password" placeholder="Mật khẩu"/>
                    <button className="btn-l btn-login" type="submit">Đăng Nhập</button>
                </form>

            </div>
        </div>
    );
};

export default memo(LoginAdminPage);