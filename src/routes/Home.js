import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import List from "../components/List";
import Subject from "../components/index/Subject";
import { useState } from "react";

const Home = () => {
  return (
    <div>
      <div className={styles.mainContainer}>
        <List />
        <div className={styles.contentContainer}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={`${styles.tableLeft} ${styles.top}`}></th>
                  <th className={styles.top}>1학기</th>
                  <th className={`${styles.tableRight} ${styles.top}`}>2학기</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableLeft}>1</td>
                  <td>1학년 1학기</td>
                  <td className={styles.tableRight}>1학년 2학기</td>
                </tr>
                <tr>
                  <td className={styles.tableLeft}>2</td>
                  <td>2학년 1학기</td>
                  <td className={styles.tableRight}>2학년 2학기</td>
                </tr>
                <tr>
                  <td className={styles.tableLeft}>3</td>
                  <td>3학년 1학기</td>
                  <td className={styles.tableRight}>3학년 2학기</td>
                </tr>
                <tr>
                  <td className={`${styles.tableLeft} ${styles.bottom}`}>4</td>
                  <td className={styles.bottom}>4학년 1학기</td>
                  <td className={`${styles.tableRight} ${styles.bottom}`}>4학년 2학기</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.choiceContainer}>
            <Subject />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
