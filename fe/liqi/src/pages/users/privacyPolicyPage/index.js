import { memo } from "react";
import "../termsOfUsePage/style.scss";
import Title from "../theme/title";
import { Link } from "react-router-dom";
import { ROUTERS } from "utils/router";
import { PRIVACY_LAST_UPDATED, PRIVACY_SECTIONS } from "constants/privacyPolicy";

const PolicySubsection = ({ subsection }) => (
    <div className="terms__subsection">
        {subsection.title && <h3 className="terms__subtitle">{subsection.title}</h3>}
        {subsection.paragraphs?.map((text, i) => (
            <p key={i}>{text}</p>
        ))}
        {subsection.list && (
            <ul>
                {subsection.list.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        )}
    </div>
);

const PolicySection = ({ section }) => (
    <section className="terms__section" id={section.id}>
        <h2 className="terms__heading">{section.title}</h2>
        {section.paragraphs?.map((text, i) => (
            <p key={i}>{text}</p>
        ))}
        {section.list && (
            <ul>
                {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        )}
        {section.subsections?.map((subsection, i) => (
            <PolicySubsection key={i} subsection={subsection} />
        ))}
        {section.paragraphsAfter?.map((text, i) => (
            <p key={`after-${i}`}>{text}</p>
        ))}
        {section.contact && (
            <ul className="terms__contact">
                <li><strong>Điện thoại:</strong> {section.contact.phone}</li>
                <li><strong>Giờ hỗ trợ:</strong> {section.contact.hours}</li>
                <li><strong>Địa chỉ:</strong> {section.contact.address}</li>
            </ul>
        )}
    </section>
);

const PrivacyPolicyPage = () => (
    <div className="terms container wide">
        <Title name="Chính Sách Bảo Mật" />
        <p className="terms__updated">Cập nhật lần cuối: {PRIVACY_LAST_UPDATED}</p>
        <p className="terms__related">
            Xem thêm: <Link to={ROUTERS.USER.TERMS}>Điều khoản sử dụng</Link>
        </p>

        <div className="terms__content">
            {PRIVACY_SECTIONS.map((section) => (
                <PolicySection key={section.id} section={section} />
            ))}
        </div>
    </div>
);

export default memo(PrivacyPolicyPage);
