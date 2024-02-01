import QRCode from "qrcode";
import { UserContext } from "../providers/UserContext";
import { AuthContext } from "../providers/AuthContext";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import classes from "../styles/ProfilePage.module.css";

const TwoFactorModal = () => {
  const { authRequestWithToken } = useContext(AuthContext);
  const { setNeedsRefresh } = useContext(UserContext);
  const [twoFactorToken, SetTwoFactorToken] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [qrCodeUrl, setQrCodeUrl] = useState();
  const [base32, setBase32] = useState();
  const [otpauthurl, setOtpauthurl] = useState();

  const verifyOtp = async (event) => {
    event.preventDefault();
    try {
      const response = await authRequestWithToken("/otp/verify", "POST", {
        twoFactorToken,
      });
      if (response.status === 200) {
        setNeedsRefresh(true);
        toast.success("Two-Factor Auth Enabled Successfully", {
          theme: "dark",
        });
        close();
      }
    } catch (error) {
      toast.error("Unable to enable Two-Factor Authentication");
    }
  };

  const generateTwoFactor = async () => {
    const response = await authRequestWithToken("/otp/generate", "POST");
    if (response.status === 200) {
      setBase32(response.data.base32);
      setOtpauthurl(response.data.otpauth_url);
      open();
    }
  };

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        //this does return a promise but i guess its not defined, definitely doesnt work without asyncawait
        const urlForQr = await QRCode.toDataURL(otpauthurl);
        setQrCodeUrl(urlForQr);
      } catch (error) {
        console.error(error);
      }
    };
    if (otpauthurl) {
      generateQrCode();
    }
  }, [otpauthurl]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Two-Factor Authentication (2FA)"
      >
        <div className={classes.mfaModalCtn}>
          <h4 className={classes.mfaTitle}>
            Configuring Google Authenticator or Authy
          </h4>
          <ol className={classes.mfaList}>
            <li>
              Install Google Authenticator (IOS - Android) or Authy (IOS -
              Android).
            </li>
            <li>In the authenticator app, select "+" icon.</li>
            <li>
              {" "}
              Select "Scan a barcode (or QR code)" and use the phone's camera to
              scan this barcode.
            </li>
          </ol>
          <hr />
          <div>
            <h4 className={classes.scanCode}>Scan QR Code</h4>
            <div className={classes.mfaImgCenter}>
              <img
                className={classes.mfaImg}
                src={qrCodeUrl}
                alt="qrcode url"
              />
            </div>
          </div>
          <div>
            <h4 className={classes.scanCode}>Or Enter Code Into Your App</h4>
            <p className={classes.enterCodeText}>
              SecretKey: {base32} (Base32 encoded)
            </p>
            <p className={classes.enterCodeText}>Label: Vanguard</p>
          </div>
          <hr />
          <form className={classes.verifyMfaForm} onSubmit={verifyOtp}>
            <label>
              To enable Two-Factor Authentication, please verify the
              authentication code:
              <input
                type="text"
                value={twoFactorToken}
                onChange={(event) => {
                  SetTwoFactorToken(event.target.value);
                }}
              />
            </label>
            <div className={classes.verifyMfaBtnCtn}>
              <input
                className={classes.verifyMfaFormBtns}
                type="submit"
                value={"Verify & Activate"}
              />
              <button
                type="button"
                className={classes.verifyMfaFormBtns}
                onClick={close}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <button
        className={classes.greenButton}
        type="button"
        onClick={generateTwoFactor}
      >
        Enable 2FA
      </button>
    </>
  );
};

export default TwoFactorModal;
