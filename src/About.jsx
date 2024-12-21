import profilePic from './assets/profilePic.png';
import './stylesBg.css';

function Header() {
  return (
    <div>

      <img src={profilePic} alt="profilePic" className='profilePic' />
      <h1 id='name'>Anurag Chandra !</h1>
      <p className='intro'>Hi,I'm ANURAG CHANDRA,an engineering studentfrom Bihar with akeen interest inelectronics andautomation technology.</p>
      <p>"In my vision, I aspire to create a utopian world where humans embrace their unique abilities, performing tasks that reflect their humanity, while bots gracefully shoulder the burdensome responsibilities."</p>

    </div>
  );
}

export default Header;
