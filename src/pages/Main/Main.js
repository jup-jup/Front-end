import { mainPosts } from "components/dummydata/main";
import { Link } from "react-router-dom";
import m from './Main.module.scss';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken) {
        setShouldRedirect(true);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (shouldRedirect) {
      navigate('/', { replace: true });
      // window.location.reload();
    }
  }, [shouldRedirect, navigate]);


  return (
    <>
      <div className={m.hero}>
        <div className={m.heroContent}>
          <div className={m.heroText}>
            <div className={m.heroTextInner}>
              <h1 className={m.heroTitle}>
                미니멀 라이프 <br /> 줍줍과 시작해요
              </h1>
              <p className={m.heroDescription}>
                물건은 많은데 정작 필요한 건 없나요? 버리기는 아깝고, 팔기는
                귀찮은 그 물건들, 어떻게 해야 할지 고민되나요? 줍줍이 해답을
                드립니다. 나누고, 정리하고, 미니멀 라이프를 경험해보세요.
              </p>
            </div>
            <div className={m.heroButton}>
              <Link to="#" className={m.getStartedButton}>
                Get started
              </Link>
            </div>
          </div>
          <div className={m.heroImage}>
            <img
              alt=""
              src={"/main/diego.jpg"}
              className={m.heroImg}
            />
          </div>
        </div>
      </div>
      <div className={m.features}>
        <div className={m.featuresContent}>
          <div className={m.featuresHeader}>
            <h2 className={m.featuresTitle}>나눔의 새로운 방식</h2>
            <p className={m.featuresSubtitle}>물건은 줄이고, 행복은 늘리고</p>
          </div>
          <div className={m.featuresList}>
            {mainPosts.map((post) => (
              <article key={post.id} className={m.featureItem}>
                <img alt="" src={post.imageUrl} className={m.featureImage} />
                <div className={m.featureOverlay} />
                <h3 className={m.featureTitle}>
                  <a>
                    {post.title}
                  </a>
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className={m.about}>
        <img alt="" src="/main/dan.jpg" className={m.aboutImage} />
        <div className={m.aboutContent}>
          <div className={m.aboutText}>
            <p className={m.aboutTitle}>
              줍줍은 단순한 나눔 플랫폼이 아닙니다.
            </p>
            <p className={m.aboutDescription}>
              물건을 나누고, 환경을 생각하고, 새로운 인연을 만드는 모든 과정을
              줍줍과 함께 경험해보세요.
            </p>
            <p className={m.aboutDescription}>
              집 안 가득 쌓인 물건들로 고민이신가요? 줍줍이 해결해드립니다.
              나눔을 통해 공간을 정리하고, 미니멀한 라이프스타일을 실천하며,
              동시에 환경 보호에 기여할 수 있습니다. 지금 바로 줍줍과 함께
              새로운 라이프스타일을 시작해보세요.
            </p>
            <p className={m.aboutDescription}>
              줍줍은 당신의 일상을 변화시킵니다. 더 이상 필요 없는 물건들을
              쉽고 빠르게 나누고, 미니멀 라이프 챌린지에 참여하며, 새로운
              커뮤니티를 만나보세요. 줍줍과 함께라면, 정리는 더 이상 힘든 일이
              아닙니다.
            </p>
          </div>
        </div>
      </div>

      <div className={m.mission}>
        <div className={m.missionContent}>
          <div className={m.missionText}>
            <p className={m.missionTitle}>
              당신의 나눔이 만드는 지속 가능한 미래
            </p>
            <p className={m.missionDescription}>
              매년 수백만 톤의 물건들이 쓰레기로 버려집니다. <br></br>하지만
              당신의 작은 실천이 이를 바꿀 수 있습니다. 줍줍에서 나눔을
              실천하고, 환경을 지키는 첫 걸음을 내딛어보세요. 당신의 나눔이
              지구를 웃게 만듭니다.
            </p>
          </div>
        </div>
        <img alt="" src="/main/maria.jpg" className={m.missionImage} />
      </div>
    </>
  );
};

export default Main;