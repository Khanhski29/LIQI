import { memo, useEffect } from "react";
import "../termsOfUsePage/style.scss";
import Title from "../theme/title";
import { FaFacebook, FaEnvelope, FaPhoneFlip } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { CONTACT, SUPPORT_TOPICS } from "constants/contactInfo";

const SupportTopic = ({ topic }) => (
    <section className="terms__section" id={topic.id}>
        <h2 className="terms__heading">{topic.title}</h2>
        {topic.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
        ))}
        {topic.list && (
            <>
                <h3 className="terms__subtitle">{topic.listTitle || "Nội dung"}</h3>
                <ul>
                    {topic.list.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </>
        )}
        {topic.steps && (
            <>
                <h3 className="terms__subtitle">{topic.stepsTitle || "Cách liên hệ"}</h3>
                <ul>
                    {topic.steps.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </>
        )}
        <div className="terms__actions">
            <a
                className="terms__action-btn"
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaFacebook /> Nhắn Facebook
            </a>
            <a className="terms__action-btn" href={`mailto:${CONTACT.email}`}>
                <FaEnvelope /> Gửi email
            </a>
        </div>
    </section>
);

const SupportPage = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;

        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [hash]);

    return (
        <div className="terms container wide">
            <Title name="Liên Hệ & Hỗ Trợ" />
            <p className="terms__updated">
                Giờ hỗ trợ: {CONTACT.hours} · Hotline: {CONTACT.phone}
            </p>

            <div className="terms__content">
                <section className="terms__section terms__section--intro">
                    <p>
                        LiQi Shop tiếp nhận mọi yêu cầu qua <strong>Fanpage Facebook</strong> hoặc{" "}
                        <strong>email</strong>. Vui lòng chọn mục phù hợp bên dưới và liên hệ theo hướng dẫn.
                    </p>
                    <div className="terms__actions terms__actions--intro">
                        <a
                            className="terms__action-btn terms__action-btn--primary"
                            href={CONTACT.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebook /> Facebook LiQi Shop
                        </a>
                        <a
                            className="terms__action-btn terms__action-btn--primary"
                            href={`mailto:${CONTACT.email}`}
                        >
                            <FaEnvelope /> {CONTACT.email}
                        </a>
                        <a className="terms__action-btn" href={`tel:${CONTACT.phone}`}>
                            <FaPhoneFlip /> {CONTACT.phone}
                        </a>
                    </div>
                </section>

                {SUPPORT_TOPICS.map((topic) => (
                    <SupportTopic key={topic.id} topic={topic} />
                ))}
            </div>
        </div>
    );
};

export default memo(SupportPage);
