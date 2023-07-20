import React from "react";
import Template1 from "./template1";
import Template11 from "./template11";
import Variant3 from "./variant3";
<<<<<<< HEAD
import Variant4 from "./variant4";
=======
<<<<<<< HEAD
import Variant4 from "./variant4";
=======
>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82
>>>>>>> f1b0523a14811655fde1878a8cb58ebf4a615d14

const LoginTemplateSwitcher = ({
  template,
  logoImg,
  handleChangeSelection,
  isUpdate,
<<<<<<< HEAD
  ...props
}) => {
  const commonProps = {
    template,
    logoImg,
    handleChangeSelection,
    isUpdate,
    ...props,
=======
<<<<<<< HEAD
  ...props
}) => {
  const commonProps = {
    template,
    logoImg,
    handleChangeSelection,
    isUpdate,
    ...props,
=======
  selected,
  username,
  password,
  hidePassword,
  rememberMe,
  hideConfirmPassword,
  confirmPassword,
  areaCode,
  phone,
  email,
  fromCustomDomain,
  promoteType,
  promoId,
  upper,
  prefill,
  tnc,
  code,
  countdown,
  handleToggleShow,
  handleUsernameChange,
  handlePasswordChange,
  handleRememberMeChange,
  handleForgotpasswordClick,
  handleLoginClick,
  handleBackToHomeClick,
  handleChangeLanguage,
  handleGoDownloadPage,
  handleToggleConfirmPasswordShow,
  handleConfirmPasswordChange,
  handleAreaCodeChange,
  handlePhoneChange,
  handleEmailChange,
  handlePromoCodeChange,
  handleUpperChange,
  handleSwitchType,
  handleTncClick,
  handleRegisterClick,
  handleCodeChange,
  handleGetCodeClick,
  handleActivationClick,
  brandLanguage,
  haveAffiliate,
}) => {
  const commonprops = {
    template: template,
    logoImg: logoImg,
    handleChangeSelection: handleChangeSelection,
    isUpdate: isUpdate,
    selected: selected,
    username: username,
    password: password,
    hidePassword: hidePassword,
    rememberMe: rememberMe,
    hideConfirmPassword: hideConfirmPassword,
    confirmPassword: confirmPassword,
    areaCode: areaCode,
    phone: phone,
    email: email,
    fromCustomDomain: fromCustomDomain,
    promoteType: promoteType,
    promoId: promoId,
    upper: upper,
    prefill: prefill,
    tnc: tnc,
    code: code,
    countdown: countdown,
    handleToggleShow: handleToggleShow,
    handleUsernameChange: handleUsernameChange,
    handlePasswordChange: handlePasswordChange,
    handleRememberMeChange: handleRememberMeChange,
    handleForgotpasswordClick: handleForgotpasswordClick,
    handleLoginClick: handleLoginClick,
    handleBackToHomeClick: handleBackToHomeClick,
    handleChangeLanguage: handleChangeLanguage,
    handleGoDownloadPage: handleGoDownloadPage,
    handleToggleConfirmPasswordShow: handleToggleConfirmPasswordShow,
    handleConfirmPasswordChange: handleConfirmPasswordChange,
    handleAreaCodeChange: handleAreaCodeChange,
    handlePhoneChange: handlePhoneChange,
    handleEmailChange: handleEmailChange,
    handlePromoCodeChange: handlePromoCodeChange,
    handleUpperChange: handleUpperChange,
    handleSwitchType: handleSwitchType,
    handleTncClick: handleTncClick,
    handleRegisterClick: handleRegisterClick,
    handleCodeChange: handleCodeChange,
    handleGetCodeClick: handleGetCodeClick,
    handleActivationClick: handleActivationClick,
    brandLanguage: brandLanguage,
    haveAffiliate: haveAffiliate,
>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82
>>>>>>> f1b0523a14811655fde1878a8cb58ebf4a615d14
  };

  const switchTemplate = (template) => {
    switch (template) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
      case 11:
        return <Template11 {...commonProps} />;
      case 13:
        return <Variant3 {...commonProps} />;
      case 14:
        return <Variant4 {...commonProps} />;
      default:
        return <Template1 {...commonProps} />;
    }
  };

=======
      case 2:
      case "2":
      case 3:
      case "3":
      case 4:
      case "4":
      case 5:
      case "5":
      case 6:
      case "6":
      case 7:
      case "7":
      case 8:
      case "8":
      case 9:
      case "9":
      case 10:
      case "10":
        return <Template1 {...commonprops} />;
>>>>>>> f1b0523a14811655fde1878a8cb58ebf4a615d14
      case 11:
        return <Template11 {...commonProps} />;
      case 13:
        return <Variant3 {...commonProps} />;
      case 14:
        return <Variant4 {...commonProps} />;
      default:
        return <Template1 {...commonProps} />;
    }
  };
<<<<<<< HEAD

=======
>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82
>>>>>>> f1b0523a14811655fde1878a8cb58ebf4a615d14
  return switchTemplate(template);
};

export default LoginTemplateSwitcher;
