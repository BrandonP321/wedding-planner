import React from "react";
import styles from "./Icons.module.scss";
import { SocialMediaPlatformMap } from "../../../common/types";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faLinkedin,
  faPinterest,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const SocialMediaIconPropMap: SocialMediaPlatformMap<IconProp> = {
  facebook: faFacebook,
  instagram: faInstagram,
  twitter: faXTwitter,
  linkedin: faLinkedin,
  pinterest: faPinterest,
  tiktok: faTiktok,
  youtube: faYoutube,
};

type SocialMediaIconProps = {
  className?: string;
};

export const SocialMediaIcons: SocialMediaPlatformMap<
  (props: SocialMediaIconProps) => React.JSX.Element
> = {
  facebook: ({ className }) => (
    <FontAwesomeIcon
      icon={SocialMediaIconPropMap.facebook}
      className={classNames(styles.facebook, styles.socialIcon, className)}
    />
  ),
  instagram: ({ className }) => (
    <FontAwesomeIcon
      icon={SocialMediaIconPropMap.instagram}
      className={classNames(styles.instagram, styles.socialIcon, className)}
    />
  ),
  twitter: ({ className }) => (
    <FontAwesomeIcon
      icon={SocialMediaIconPropMap.twitter}
      className={classNames(styles.twitter, styles.socialIcon, className)}
    />
  ),
  linkedin: ({ className }) => (
    <FontAwesomeIcon
      icon={SocialMediaIconPropMap.linkedin}
      className={classNames(styles.linkedin, styles.socialIcon, className)}
    />
  ),
  pinterest: ({ className }) => (
    <FontAwesomeIcon
      icon={SocialMediaIconPropMap.pinterest}
      className={classNames(styles.pinterest, styles.socialIcon, className)}
    />
  ),
  tiktok: ({ className }) => (
    <FontAwesomeIcon
      icon={SocialMediaIconPropMap.tiktok}
      className={classNames(styles.tiktok, styles.socialIcon, className)}
    />
  ),
  youtube: ({ className }) => (
    <FontAwesomeIcon
      icon={SocialMediaIconPropMap.youtube}
      className={classNames(styles.youtube, styles.socialIcon, className)}
    />
  ),
};
