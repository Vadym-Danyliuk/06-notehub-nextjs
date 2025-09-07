import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} Note-Hub V1.3 </p>
        <div className={css.wrap}>
          <p>Developer: Vadum Danyliuk  </p>
          <p>
            Contact us:{' '}
            <a href="mailto:student@notehub.app">student@notehub.app</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
