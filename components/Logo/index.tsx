import Image from 'next/image';
import wuolahLogo from '../../public/wuolahLogo.png';

const Logo = () => (
  <Image src={wuolahLogo} alt="Logo" width={120} height={20} />
);

export default Logo;
