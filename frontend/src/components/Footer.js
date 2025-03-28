import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 50px 0;
`;

const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
  padding: 0 20px;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const FooterLink = styled.a`
  display: block;
  font-size: 0.95rem;
  color: #bbb;
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
  
  a {
    color: #bbb;
    font-size: 1.5rem;
    transition: color 0.3s;
  }

  a:hover {
    color: #fff;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 30px;
  font-size: 0.9rem;
  color: #bbb;
  border-top: 1px solid #333;
  padding-top: 15px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        {/* Shop Information */}
        <FooterSection>
          <SectionTitle>Shop</SectionTitle>
          <p className="text-sm text-gray-400">
            Your one-stop destination for the latest trends and styles. Shop now and stay ahead!
          </p>
        </FooterSection>

        {/* Customer Support */}
        <FooterSection>
          <SectionTitle>Customer Support</SectionTitle>
          <FooterLink href="#">Contact Us</FooterLink>
          <FooterLink href="#">Track Order</FooterLink>
          <FooterLink href="#">Returns & Refunds</FooterLink>
          <FooterLink href="#">FAQs</FooterLink>
        </FooterSection>

        {/* Company */}
        <FooterSection>
          <SectionTitle>Company</SectionTitle>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Terms & Conditions</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
        </FooterSection>

        {/* Social Media */}
        <FooterSection>
          <SectionTitle>Follow Us</SectionTitle>
          <SocialIcons>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </SocialIcons>
        </FooterSection>
      </FooterWrapper>

      {/* Footer Bottom */}
      <FooterBottom>
        &copy; {new Date().getFullYear()} Shop. All Rights Reserved.
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
