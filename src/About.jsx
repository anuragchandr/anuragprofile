import profilePic from './assets/profilePic.png';
function Header() {
    return (
      <div>
        <p>Hi,I'm ANURAG CHANDRA,an engineering studentfrom Bihar with akeen interest inelectronics andautomation technology.</p>
        <p>"In my vision, I aspire to create a utopian world where humans embrace their unique abilities, performing tasks that reflect their humanity, while bots gracefully shoulder the burdensome responsibilities."</p>
        <img src={profilePic} alt="profilePic" />
      </div>
    );
  }
  
  export default Header;
  