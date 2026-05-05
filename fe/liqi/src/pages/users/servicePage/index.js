import { memo  } from "react";
import "./style.scss";
import Title from "../theme/title";
import { Link } from "react-router-dom";

const ServicePage = () => {

    return (
        <div className="service container wide">

            <div className="bg bg-default"></div>
            <div className="bg bg-sell"></div>
            <div className="bg bg-order"></div>
            <div className="bg bg-trans"></div>

            <Title name="Dịch Vụ Chu Đáo" />

            <div className="service__container row">
                <div className="service__item col lg-4">
                    <p className="service__title title__sell">Bạn Muốn Bán Acc</p>
                    <p>+ thu mua acc giá cao</p>
                    <p>+ cân thông tin xấu</p>
                </div>

                <div className="service__item col lg-4">
                    <p className="service__title title__order">Order Acc Theo Yêu Cầu</p>
                    <p>+ tìm acc như ý muốn</p>
                    <p>+ không yêu cầu nào làm khó được shop</p>
                </div>

                <div className="service__item col lg-4">
                    <p className="service__title title__trans">Tôi Muốn Giao Dịch Trực Tiếp</p>
                    <p>+ gặp tận nơi để đảm bảo khi acc giá trị cao</p>
                    <p>+ đảm bảo sự uy tín trọn vẹn</p>
                </div>

                <div className="service__about col lg-12">
                    <p>
                        Chúng tôi mang đến dịch vụ mua bán và order acc game một cách nhanh chóng, uy tín và đáng tin cậy, giúp bạn tiết kiệm thời gian mà vẫn sở hữu được tài khoản như mong muốn. Không chỉ hỗ trợ thu mua acc với mức giá hấp dẫn, chúng tôi còn sẵn sàng tìm kiếm những tài khoản phù hợp theo yêu cầu riêng của từng khách hàng, từ phổ thông đến hiếm, giá trị cao. Đối với các giao dịch lớn, bạn có thể hoàn toàn yên tâm khi được hỗ trợ giao dịch trực tiếp với quy trình rõ ràng, minh bạch. Mỗi bước đều được kiểm tra kỹ lưỡng nhằm đảm bảo an toàn tuyệt đối, hạn chế rủi ro và bảo vệ tối đa quyền lợi của bạn. Sự hài lòng và tin tưởng của khách hàng chính là điều mà chúng tôi luôn đặt lên hàng đầu, và cũng là động lực để không ngừng nâng cao chất lượng dịch vụ mỗi ngày.
                    </p>
                    <Link>Trao đổi qua tin nhắn</Link>
                </div>
            </div>
        </div>
    );
};

export default memo(ServicePage);