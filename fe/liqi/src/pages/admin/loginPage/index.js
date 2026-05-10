import { memo } from "react";
import "./style.scss";
import Title from "pages/users/theme/title";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "utils/router";


const LoginAdminPage = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(ROUTERS.ADMIN.ORDERMANAGER)
    }

    
    return (
        <div className="login__admin">
            <div className="login__admin__box">
                <Title name="TRUY CẬP HỆ THỐNG QUẢN TRỊ"/>

                <form className="admin__login__form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Tên đăng nhập" required/>
                    <input type="password" placeholder="Mật khẩu" required/>
                    <button className="btn-l btn-login" type="submit">Đăng Nhập</button>
                </form>

            </div>
        </div>
    );
};

export default memo(LoginAdminPage);