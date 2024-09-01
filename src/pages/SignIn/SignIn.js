import instance from '../../api/axios';
import styles from './SingIn.module.scss';

export default function SignIn() {
  const baseURL = instance.defaults.baseURL;
  const validProviders = ['google', 'kakao', 'naver'];

  const handleLogin = (provider) => {
    if (!validProviders.includes(provider)) {
      alert(`지원되지 않는 로그인 방식입니다: ${provider}`);
      return;
    }
    window.location.href = `https://jupjup.store/api/v1/user/login?provider=${provider}`;
    sessionStorage.setItem('accessToken', provider);
    window.dispatchEvent(new Event('loginStateChange'));
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>로그인</h2>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formContent}>
          <form action="#" method="POST" className={styles.form}>
            <div className={styles.loginButtons}>
              {['google', 'kakao', 'naver'].map((provider) => (
                <img
                  key={provider}
                  src={`/login/${provider}.png`}
                  className={styles.loginButton}
                  onClick={() => handleLogin(provider)}
                  alt={`${provider} 로그인`}
                />
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}