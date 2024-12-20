import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Language = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

interface LanguageChangeEvent extends React.ChangeEvent<HTMLSelectElement> {}

const handleLanguageChange = (e: LanguageChangeEvent) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
};

  return (
    <select onChange={handleLanguageChange} value={i18n.language}>
      <option value="en">English</option>
      <option value="nl">Nederlands</option>
    </select>
  );
};

export default Language;