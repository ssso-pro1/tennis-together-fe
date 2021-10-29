import React from 'react';
import styles from './Navbar.module.css';
// import Tennis from '/images/Tennis.svg';

const Navbar = props => {
  return (
    // 로그인한 경우 : 종? 프로필사진, 글쓰기 버튼
    // 안한 경우 : 로그인 회원강비 글쓰기 버튼
    <section className={styles.navbar}>
      <div className={styles.logoDiv}>
        {/* <img src={Tennis} /> */}
        <h3 className={styles.logo}>테니스투게더</h3>
      </div>
      <div className={styles.buttons}>
        <span className={styles.navBtn}>로그인</span>
        <span className={styles.navBtn}>회원가입</span>
        <button className={styles.writeBtn}>글쓰기</button>
      </div>
    </section>
  );
};

export default Navbar;
