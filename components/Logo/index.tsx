import Image from 'next/image';
import wuolahLogo from '../../public/wuolahLogo.png';

const Logo = () => (
  <a>
    <Image src={wuolahLogo} alt="Logo" width={120} height={20} />
  </a>
);

export default Logo;
