// FILE: pages/profile.tsx

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { User } from '@/types';
import Header from '@/components/Header';
import styles from '@/styles/ProfilePage.module.css';

interface ProfilePageProps {
  user: User | null;
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const router = useRouter();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.profile}>
          <img src={user.avatar} alt={user.username} className={styles.avatar} />
          <h2 className={styles.username}>{user.username}</h2>
          <p className={styles.role}>Role: {user.role}</p>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const user = await res.json();

  return {
    props: {
      user,
    },
  };
};

export default ProfilePage;