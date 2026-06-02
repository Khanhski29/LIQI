import { memo, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { useMyOrdersUS, useChangePasswordUS } from "api/auth";
import { formatter } from "utils/formatter";
import Title from "pages/users/theme/title";

const CopyCredentials = ({ username, password }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${username} | ${password}`).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    return (
        <div className="creds-row">
            <span className="creds-row__value">{username} | {password}</span>
            <button className={`btn-copy ${copied ? "btn-copy--done" : ""}`} onClick={handleCopy}>
                {copied ? "Đã copy!" : "Copy"}
            </button>
        </div>
    );
};

const STATUS_LABEL = {
    pending: { text: "Chờ thanh toán", cls: "status--pending" },
    done: { text: "Thành công", cls: "status--done" },
    cancel: { text: "Đã huỷ", cls: "status--cancel" },
    refund_needed: { text: "Cần hoàn tiền", cls: "status--refund" },
};

const ProfilePage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [visibleCreds, setVisibleCreds] = useState({});
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [pwForm, setPwForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
    const [pwError, setPwError] = useState("");
    const [pwSuccess, setPwSuccess] = useState("");

    const authUser = (() => {
        try { return JSON.parse(localStorage.getItem("user_auth_user")); } catch { return null; }
    })();

    const { data, isLoading } = useMyOrdersUS({ page });

    const { mutate: changePassword, isPending: isChangingPw } = useChangePasswordUS({
        onSuccess: () => {
            setPwSuccess("Đổi mật khẩu thành công!");
            setPwError("");
            setPwForm({ current_password: "", new_password: "", confirm_password: "" });
            setTimeout(() => { setPwSuccess(""); setShowChangePassword(false); }, 2000);
        },
        onError: (error) => {
            setPwError(error?.response?.data?.message || "Đổi mật khẩu thất bại.");
            setPwSuccess("");
        },
    });

    const handleChangePw = (e) => {
        setPwForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmitPw = (e) => {
        e.preventDefault();
        setPwError("");
        if (pwForm.new_password !== pwForm.confirm_password) {
            setPwError("Mật khẩu mới không khớp.");
            return;
        }
        changePassword({ current_password: pwForm.current_password, new_password: pwForm.new_password });
    };

    if (!authUser) {
        navigate(ROUTERS.USER.LOGIN, { replace: true });
        return null;
    }

    const toggleCreds = (id) => {
        setVisibleCreds((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="profile container wide">
            <Title name="Tài Khoản Của Tôi" />

            <div className="profile__info">
                <p><span>Tên:</span> {authUser.name}</p>
                <p><span>Email:</span> {authUser.email}</p>
                {authUser.phone && <p><span>Số điện thoại:</span> {authUser.phone}</p>}
                <button
                    className="btn-change-pw"
                    onClick={() => { setShowChangePassword((v) => !v); setPwError(""); setPwSuccess(""); }}
                >
                    {showChangePassword ? "Huỷ" : "Đổi mật khẩu"}
                </button>

                {showChangePassword && (
                    <form className="change-pw-form" onSubmit={handleSubmitPw}>
                        <input
                            type="password"
                            name="current_password"
                            placeholder="Mật khẩu hiện tại"
                            value={pwForm.current_password}
                            onChange={handleChangePw}
                            required
                        />
                        <input
                            type="password"
                            name="new_password"
                            placeholder="Mật khẩu mới (tối thiểu 6 ký tự)"
                            value={pwForm.new_password}
                            onChange={handleChangePw}
                            required
                        />
                        <input
                            type="password"
                            name="confirm_password"
                            placeholder="Xác nhận mật khẩu mới"
                            value={pwForm.confirm_password}
                            onChange={handleChangePw}
                            required
                        />
                        {pwError && <p className="pw-msg pw-msg--error">{pwError}</p>}
                        {pwSuccess && <p className="pw-msg pw-msg--success">{pwSuccess}</p>}
                        <button type="submit" className="btn-l btn-pw-submit" disabled={isChangingPw}>
                            {isChangingPw ? "Đang lưu..." : "Xác nhận"}
                        </button>
                    </form>
                )}
            </div>



            <div className="profile__orders">

                <h3 className="profile__section-title">Lịch sử đơn hàng</h3>

                {isLoading && <p className="profile__loading">Đang tải...</p>}

                {!isLoading && data?.data?.length === 0 && (
                    <p className="profile__empty">Bạn chưa có đơn hàng nào.</p>
                )}

                {data?.data?.map((order) => {
                    const status = STATUS_LABEL[order.payment_status] || { text: order.payment_status, cls: "" };
                    const showCreds = visibleCreds[order.id];

                    return (
                        <div key={order.id} className="profile__order-card">
                            <div className="profile__order-card__left">
                                <img
                                    src={order.snapshot_img}
                                    alt="acc"
                                    onClick={() => setSelectedImage(order.snapshot_img)}
                                />
                            </div>

                            <div className="profile__order-card__info">
                                <p className="order-id">Đơn #{order.id}</p>
                                <p className="order-price">{formatter(order.snapshot_price)}</p>
                                <p className="order-date">{order.created_at}</p>
                                <span className={`order-status ${status.cls}`}>{status.text}</span>
                            </div>

                            {order.payment_status === "done" && (
                                <div className="profile__order-card__creds">
                                    <div className="creds-box">
                                        <CopyCredentials
                                            username={order.username_account}
                                            password={order.password_account}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {selectedImage && (
                <div className="overlay" onClick={() => setSelectedImage(null)}>
                    <img
                        src={selectedImage}
                        className="overlay-img"
                        onClick={(e) => e.stopPropagation()}
                        alt="preview"
                    />
                </div>
            )}

            {data?.last_page > 1 && (
                <div className="profile__pagination">
                    <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>{"<"}</button>
                    <span>{page} / {data.last_page}</span>
                    <button disabled={page === data.last_page} onClick={() => setPage((p) => p + 1)}>{">"}</button>
                </div>
            )}
        </div>
    );
};

export default memo(ProfilePage);
