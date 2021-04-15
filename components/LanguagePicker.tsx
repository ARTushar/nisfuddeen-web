import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

type Lang = {
  key: string;
  title: string;
};

const langs: Lang[] = [
  { key: 'en', title: 'en' },
  { key: 'bn', title: 'bn' },
];

const LanguagePicker: React.FC = () => {
  const router = useRouter();
  const [lang, setLang] = useState(router.locale);
  const [_, setCookie] = useCookies(['NEXT_LOCALE']);

  useEffect(() => {
    console.log(lang);
    setCookie('NEXT_LOCALE', lang);
    router.push(router.pathname, router.pathname, { locale: lang });
  }, [lang]);

  return (
    <div>
      <select
        onChange={e => setLang(e.target.value)}
        defaultValue={router.locale}
        className="p-1 rounded"
      >
        {langs.map(e => (
          <option value={e.key} key={e.key}>
            {e.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguagePicker;
