import { memo, useCallback, useEffect, useRef } from "react";
import "./style.scss";
import Title from "../theme/title";
import { Link } from "react-router-dom";
import { splitText, stagger, animate, createScope } from "utils/anime";

const ServiceTitle = memo(({ children, className = "" }) => {
    const titleRef = useRef(null);
    const splitRef = useRef(null);
    const timelineRef = useRef(null);
    const isAnimatingRef = useRef(false);
    const isFlippedRef = useRef(false);

    useEffect(() => {
        const el = titleRef.current;
        if (!el) return;

        splitRef.current = splitText(el, {
            chars: {
                wrap: "clip",
                clone: "bottom",
            },
        });

        return () => {
            timelineRef.current?.pause();
            splitRef.current?.revert();
            splitRef.current = null;
            isFlippedRef.current = false;
        };
    }, [children]);

    const handleMouseEnter = useCallback(() => {
        const chars = splitRef.current?.chars;
        if (!chars?.length || isAnimatingRef.current || isFlippedRef.current) return;

        isAnimatingRef.current = true;
        timelineRef.current?.pause();

        timelineRef.current = animate(chars, {
            y: "-100%",
            delay: stagger(18),
            duration: 400,
            ease: "out(3)",
            onComplete: () => {
                isAnimatingRef.current = false;
                isFlippedRef.current = true;
                titleRef.current?.classList.add("service__title--hovered");
            },
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        const chars = splitRef.current?.chars;

        timelineRef.current?.pause();
        isAnimatingRef.current = false;
        isFlippedRef.current = false;
        titleRef.current?.classList.remove("service__title--hovered");

        if (chars?.length) {
            animate(chars, { y: "0%", duration: 0 });
        }
    }, []);

    return (
        <p
            ref={titleRef}
            className={`service__title ${className}`.trim()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </p>
    );
});

ServiceTitle.displayName = "ServiceTitle";

const ServicePage = () => {
    const contactLinkRef = useRef(null);
    const contactScopeRef = useRef(null);
    const contactInViewRef = useRef(false);

    useEffect(() => {
        const link = contactLinkRef.current;
        if (!link) return;

        const playFadeIn = () => {
            contactScopeRef.current?.revert();
            contactScopeRef.current = createScope({ root: contactLinkRef }).add(() => {
                animate(link, {
                    opacity: [0, 1],
                    translateX: [20, 0],
                    duration: 650,
                    ease: "out(3)",
                });
            });
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (contactInViewRef.current) return;
                    contactInViewRef.current = true;
                    playFadeIn();
                    return;
                }

                if (!contactInViewRef.current) return;
                contactInViewRef.current = false;
                contactScopeRef.current?.revert();
                contactScopeRef.current = null;
            },
            { threshold: 0.4 }
        );

        observer.observe(link);

        return () => {
            observer.disconnect();
            contactScopeRef.current?.revert();
            contactScopeRef.current = null;
            contactInViewRef.current = false;
        };
    }, []);

    return (
        <div className="service container wide">
            <div className="bg bg-default"></div>
            <div className="bg bg-sell"></div>
            <div className="bg bg-order"></div>
            <div className="bg bg-trans"></div>

            <Title name="Dịch Vụ Chu Đáo" />

            <div className="service__container row">
                <div className="service__item col lg-4 md-4 lmd-12 sm-12">
                    <ServiceTitle className="title__sell">Bạn Muốn Bán Acc</ServiceTitle>
                    <p>+ thu mua acc giá cao</p>
                    <p>+ cân thông tin xấu</p>
                </div>

                <div className="service__item col lg-4 md-4 lmd-12 sm-12">
                    <ServiceTitle className="title__order">Order Acc Theo Yêu Cầu</ServiceTitle>
                    <p>+ tìm acc như ý muốn</p>
                    <p>+ không yêu cầu nào làm khó được shop</p>
                </div>

                <div className="service__item col lg-4 md-4 lmd-12 sm-12">
                    <ServiceTitle className="title__trans">Tôi Muốn Giao Dịch Trực Tiếp</ServiceTitle>
                    <p>+ gặp tận nơi để đảm bảo khi acc giá trị cao</p>
                    <p>+ đảm bảo sự uy tín trọn vẹn</p>
                </div>

                <div className="service__about col lg-12 md-12 lmd-12 sm-12">
                    <p>
                        Chúng tôi mang đến dịch vụ mua bán và order acc game một cách nhanh chóng, uy tín và đáng tin cậy, giúp bạn tiết kiệm thời gian mà vẫn sở hữu được tài khoản như mong muốn. Không chỉ hỗ trợ thu mua acc với mức giá hấp dẫn, chúng tôi còn sẵn sàng tìm kiếm những tài khoản phù hợp theo yêu cầu riêng của từng khách hàng, từ phổ thông đến hiếm, giá trị cao. Đối với các giao dịch lớn, bạn có thể hoàn toàn yên tâm khi được hỗ trợ giao dịch trực tiếp với quy trình rõ ràng, minh bạch. Mỗi bước đều được kiểm tra kỹ lưỡng nhằm đảm bảo an toàn tuyệt đối, hạn chế rủi ro và bảo vệ tối đa quyền lợi của bạn. Sự hài lòng và tin tưởng của khách hàng chính là điều mà chúng tôi luôn đặt lên hàng đầu, và cũng là động lực để không ngừng nâng cao chất lượng dịch vụ mỗi ngày.
                    </p>
                    <Link ref={contactLinkRef} className="service__about-link">
                        Trao đổi qua tin nhắn
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default memo(ServicePage);
