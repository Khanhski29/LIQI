import { memo, useState } from "react";
import "./style.scss";
import { useNavigate, Link, generatePath } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { useMyOrdersUS, useChangePasswordUS, useLogoutUS } from "api/auth";
import { formatter } from "utils/formatter";
import Title from "pages/users/theme/title";
import { clearUserSession, getUserAuth, setUserSession } from "utils/authStorage";

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

const INSTALLMENT_STATUS_LABEL = {
    active:    { text: "Đang trả góp", cls: "installment--active" },
    completed: { text: "Hoàn tất", cls: "installment--done" },
    defaulted: { text: "Đã thu hồi", cls: "installment--defaulted" },
};

const ProfilePage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [pwForm, setPwForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
    const [pwError, setPwError] = useState("");
    const [pwSuccess, setPwSuccess] = useState("");

    const authUser = getUserAuth();

    const { data, isLoading } = useMyOrdersUS({ page });

    const { mutate: logout } = useLogoutUS({
        onSettled: () => {
            clearUserSession();
            navigate(ROUTERS.USER.HOME);
        },
    });

    const { mutate: changePassword, isPending: isChangingPw } = useChangePasswordUS({
        onSuccess: (data) => {
            if (data?.token) {
                setUserSession(data.token, authUser);
            }
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

    const installmentOrders = data?.installment_orders || [];

    return (
        <div className="profile container wide">
            <Title name="Tài Khoản Của Tôi" />

            <div className="profile__info">
                <p><span>Tên:</span> {authUser.name}</p>
                <p><span>Email:</span> {authUser.email}</p>
                {authUser.phone && <p><span>Số điện thoại:</span> {authUser.phone}</p>}
                <div className="profile__info-actions">
                    <button
                        className="btn-change-pw"
                        onClick={() => { setShowChangePassword((v) => !v); setPwError(""); setPwSuccess(""); }}
                    >
                        {showChangePassword ? "Huỷ" : "Đổi mật khẩu"}
                    </button>
                    <button className="btn-logout" type="button" onClick={() => logout()}>
                        Đăng xuất
                    </button>
                </div>

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

            {installmentOrders.length > 0 && (
                <div className="profile__installments">
                    <h3 className="profile__section-title">Acc trả góp</h3>
                    {installmentOrders.map((order) => {
                        const inst = order.installment;
                        const instStatus = INSTALLMENT_STATUS_LABEL[inst.status] || { text: inst.status, cls: "" };
                        const next = inst.next_period;

                        return (
                            <div key={`inst-${order.id}`} className="profile__installment-card">
                                <div className="profile__installment-card__left">
                                    <img
                                        src={order.snapshot_img}
                                        alt={order.product_code}
                                        onClick={() => setSelectedImage(order.snapshot_img)}
                                    />
                                </div>
                                <div className="profile__installment-card__body">
                                    <p className="installment-code">
                                        #{order.product_code || order.id} · Đơn #{order.id}
                                    </p>
                                    <p className="installment-plan">
                                        {inst.months} tháng · Trả trước {inst.down_payment_pct}% ·{" "}
                                        {formatter(inst.monthly)}/tháng
                                    </p>
                                    <p className="installment-progress">
                                        Đã trả: {inst.paid_periods}/{inst.months} kỳ
                                    </p>
                                    <span className={`installment-status ${instStatus.cls}`}>
                                        {instStatus.text}
                                    </span>

                                    {order.username_account && order.password_account && (
                                        <div className="installment-creds">
                                            <CopyCredentials
                                                username={order.username_account}
                                                password={order.password_account}
                                            />
                                        </div>
                                    )}

                                    {inst.status === "active" && next && (
                                        <div className="installment-next">
                                            <p>
                                                Kỳ {next.period}: {formatter(next.amount)} · Hạn {next.due_date}
                                                {next.schedule_status === "overdue" && " (quá hạn)"}
                                            </p>
                                            {next.can_pay ? (
                                                <Link
                                                    className="btn-l installment-pay"
                                                    to={generatePath(ROUTERS.USER.INSTALLMENT_PAY, {
                                                        token: next.payment_token,
                                                    })}
                                                >
                                                    Thanh toán kỳ {next.period}
                                                </Link>
                                            ) : (
                                                <p className="installment-wait">
                                                    Thanh toán mở từ ngày {next.due_date}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {inst.status === "completed" && (
                                        <p className="installment-note">Bạn đã hoàn tất trả góp acc này.</p>
                                    )}

                                    {inst.status === "defaulted" && (
                                        <p className="installment-note installment-note--warn">
                                            Acc đã bị thu hồi do quá hạn. Liên hệ shop nếu cần hỗ trợ.
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="profile__orders">

                <h3 className="profile__section-title">Lịch sử đơn hàng</h3>

                {isLoading && <p className="profile__loading">Đang tải...</p>}

                {!isLoading && data?.data?.length === 0 && (
                    <p className="profile__empty">Bạn chưa có đơn hàng nào.</p>
                )}

                {data?.data?.map((order) => {
                    const status = STATUS_LABEL[order.payment_status] || { text: order.payment_status, cls: "" };

                    return (
                        <div key={order.id} className="profile__order-card">
                            <div className="profile__order-card__left">
                                <img
                                    src={order.snapshot_img}
                                    alt="acc"
                                    onClick={() => setSelectedImage(order.snapshot_img)}
                                />
                            </div>

                            <div className="profile__order-card__info row">
                                <p className="order-id col lg-1 md-1 lmd-2 sm-6">Đơn #{order.id}</p>
                                <p className="order-price col lg-2 md-2 lmd-2 sm-6">{formatter(order.snapshot_price)}</p>
                                <p className="order-date col lg-3 md-3 lmd-3 sm-6">{order.created_at}</p>
                                <span className={`order-status ${status.cls} col lg-2 md-2 lmd-2 sm-6`}>{status.text}</span>

                                {order.payment_status === "done" && (
                                    <div className="profile__order-card__creds col lg-3 md-3 lmd-3 sm-4">
                                        <div className="creds-box">
                                            <CopyCredentials
                                                username={order.username_account}
                                                password={order.password_account}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>


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
