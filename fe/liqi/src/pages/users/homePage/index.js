import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { HOME_IMAGES, SLIDER_TRACK } from "constants/homeImages";

const SLIDER_SOURCES = [...new Set(SLIDER_TRACK)];

const HomePage = () => {
    const navigate = useNavigate();
    const trackRef = useRef(null);
    const [isSliderReady, setIsSliderReady] = useState(false);

    const restartSliderAnimation = useCallback(() => {
        if (!trackRef.current) return;

        const track = trackRef.current;
        track.style.animation = "none";
        void track.offsetHeight;
        track.style.animation = "";
    }, []);

    useEffect(() => {
        let cancelled = false;
        setIsSliderReady(false);

        let loaded = 0;
        const markReady = () => {
            loaded += 1;
            if (!cancelled && loaded >= SLIDER_SOURCES.length) {
                setIsSliderReady(true);
            }
        };

        SLIDER_SOURCES.forEach((src) => {
            const img = new Image();
            img.onload = markReady;
            img.onerror = markReady;
            img.src = src;
        });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!isSliderReady) return;
        restartSliderAnimation();
    }, [isSliderReady, restartSliderAnimation]);

    useEffect(() => {
        const onVisibilityChange = () => {
            if (document.visibilityState === "visible" && isSliderReady) {
                restartSliderAnimation();
            }
        };

        document.addEventListener("visibilitychange", onVisibilityChange);
        return () => document.removeEventListener("visibilitychange", onVisibilityChange);
    }, [isSliderReady, restartSliderAnimation]);

    const trackClassName = useMemo(
        () => `slider__track${isSliderReady ? " slider__track--ready" : ""}`,
        [isSliderReady]
    );

    return (
        <div className="container wide homepage">
            <div className="slider">
                <div className={trackClassName} ref={trackRef}>
                    {SLIDER_TRACK.map((src, index) => (
                        <div className="card" key={index}>
                            <img src={src} alt="" decoding="async" />
                        </div>
                    ))}
                </div>

                <div className="slider__text">
                    <p>LiQi Shop</p>
                    <p>Shop acc liên quân uy tín - giá rẻ - an toàn. Đa dạng lựa chọn, tìm acc theo yêu cầu, giao lưu lên đời và trả góp 0%.</p>
                </div>
            </div>

            <div className="content">
                <div className="container block block1">
                    <div className="row">
                        <div className="col lg-8 md-6 lmd-6 sm-8 text">
                            <p>Tại Sao Là LiQi Shop</p>
                            <p>-Mức giá hợp lý để sở hữu skin hot nhất</p>
                            <p>-Đổi thông tin an toàn cho khách</p>
                            <p>-dịch vụ trả góp, trả trước 50% là log acc chơi</p>
                            <button className="btn-l" onClick={() => navigate(ROUTERS.USER.PRODUCTS)}>Mua Ngay</button>
                        </div>
                        <div className="col lg-4 md-6 lmd-6 sm-4 picture">
                            <img src={HOME_IMAGES.blocks.p2} alt="" loading="lazy" />
                        </div>
                    </div>
                </div>

                <div className="container block block2">
                    <div className="row">
                        <div className="col lg-4 md-6 lmd-6 sm-4 picture">
                            <img src={HOME_IMAGES.blocks.p1} alt="" loading="lazy" />
                        </div>
                        <div className="col lg-8 md-6 lmd-6 sm-8 text">
                            <p>Shop có thu lại acc không ?</p>
                            <p>-Tất nhiên là có</p>
                            <p>-Thu lại acc giá tốt trên 50%</p>
                            <button className="btn-l">Bán Ngay</button>
                        </div>
                    </div>
                </div>

                <div className="container block block3">
                    <div className="row">
                        <div className="col lg-8 md-6 lmd-6 sm-8 text">
                            <p>Hợp tác với chúng tôi</p>
                            <p>-Trở thành người bán acc</p>
                            <p>-Có hỗ trợ bảo kê uy tín</p>
                            <p>-Giới thiệu khách hàng và nhận hoa hồng</p>
                            <button className="btn-l">Đăng Ký Ngay</button>
                        </div>
                        <div className="col lg-4 md-6 lmd-6 sm-4 picture">
                            <img src={HOME_IMAGES.blocks.p3} alt="" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(HomePage);
