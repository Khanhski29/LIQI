import { memo, useState } from "react";
import "./style.scss";
import Title from "pages/users/theme/title";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { useLoginUS } from "api/auth";

const LoginAdminPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const { mutate: login, isPending } = useLoginUS({
        onSuccess: (data) => {
            if (data.user?.role !== "admin") {
                setErrorMsg("Tài khoản không có quyền truy cập hệ thống quản trị.");
                return;
            }

            localStorage.setItem("auth_token", data.token);
            localStorage.setItem("auth_user", JSON.stringify(data.user));

            navigate(ROUTERS.ADMIN.ORDERMANAGER);
        },
        onError: (error) => {
            const msg =
                error?.response?.data?.errors?.email?.[0] ||
                error?.response?.data?.message ||
                "Đăng nhập thất bại, vui lòng thử lại.";
            setErrorMsg(msg);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");
        login({ email, password });
    };

    return (
        <div className="login__admin">
            <div className="login__admin__box">
                <Title name="TRUY CẬP HỆ THỐNG QUẢN TRỊ" />

                <form className="admin__login__form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {errorMsg && (
                        <p className="login__error">{errorMsg}</p>
                    )}

                    <button
                        className="btn-l btn-login"
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? "Đang đăng nhập..." : "Đăng Nhập"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default memo(LoginAdminPage);
