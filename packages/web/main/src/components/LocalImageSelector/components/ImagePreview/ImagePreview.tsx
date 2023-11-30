import React, { useState } from "react";
import styles from "./ImagePreview.module.scss";
import {
  AspectRatioImage,
  ContextMenu,
  ContextMenuOption,
  ContextMenuProps,
  SpaceBetween,
  SpaceBetweenListItem,
} from "@wedding-planner/shared/web/components";
import {
  faPenToSquare,
  faStar as faStarFilled,
  faTrash,
  faEllipsisVertical,
} from "@fortawesome/pro-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ImageForUpload } from "components/LocalImageSelector/imageSelectorHelpers";

export type ImagePreviewProps = {
  file: ImageForUpload;
  isInShowcase?: boolean;
  hideMoreOptions?: boolean;
  reorderLabel?: string;
  disableShowcaseBtn?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onShowcaseClick: () => void;
  onReorderClick?: () => void;
};

export const ImagePreview = (props: ImagePreviewProps) => {
  const { file } = props;

  return (
    <SpaceBetweenListItem classes={{ root: styles.outerWrapper }}>
      <div className={styles.thumbWrapper}>
        <AspectRatioImage img={file.preview} classes={{ root: styles.thumb }} />
        <div className={styles.showcaseIndicator}>
          <StarIcon {...props} />
        </div>
      </div>
      <ImageActions {...props} />
    </SpaceBetweenListItem>
  );
};

const StarIcon = ({ isInShowcase = false }: ImagePreviewProps) => (
  <FontAwesomeIcon
    className={classNames(
      styles.icon,
      styles.showcaseIcon,
      isInShowcase && styles.active
    )}
    icon={isInShowcase ? faStarFilled : faStarOutline}
  />
);

const ImageActions = (props: ImagePreviewProps) => {
  const {
    onEditClick,
    onDeleteClick,
    onShowcaseClick,
    disableShowcaseBtn,
    hideMoreOptions = false,
  } = props;

  const [showContextMenu, setShowContextMenu] = useState(false);

  return (
    <SpaceBetween
      classes={{
        root: classNames(styles.actions, showContextMenu && styles.showMenu),
      }}
      justify="end"
    >
      {!!onDeleteClick && (
        <div className={classNames(styles.action, styles.delete)}>
          <button onClick={onDeleteClick}>
            <FontAwesomeIcon
              icon={faTrash}
              className={classNames(styles.icon, styles.delete)}
            />
          </button>
        </div>
      )}
      <div className={classNames(styles.action)}>
        <button onClick={onShowcaseClick} disabled={disableShowcaseBtn}>
          <StarIcon {...props} />
        </button>
      </div>
      {!!onEditClick && (
        <div className={styles.action}>
          <button onClick={onEditClick}>
            <FontAwesomeIcon icon={faPenToSquare} className={styles.icon} />
          </button>
        </div>
      )}
      {!hideMoreOptions && (
        <div className={classNames(styles.action, styles.moreOptions)}>
          <button
            onClick={() =>
              requestAnimationFrame(() => setShowContextMenu(!showContextMenu))
            }
          >
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className={styles.icon}
            />
          </button>
          <ImageContextMenu
            {...props}
            show={showContextMenu}
            hide={() => setShowContextMenu(false)}
          />
        </div>
      )}
    </SpaceBetween>
  );
};

const ImageContextMenu = (
  props: ImagePreviewProps & Pick<ContextMenuProps, "show" | "hide">
) => {
  const {
    onShowcaseClick,
    onDeleteClick,
    onEditClick,
    show,
    isInShowcase,
    hide,
    reorderLabel = "Change order",
    onReorderClick,
  } = props;

  return (
    <ContextMenu
      title="Image options"
      show={show}
      hide={hide}
      options={[
        {
          label: "Edit",
          onClick: onEditClick,
        },
        {
          label: isInShowcase ? "Remove from showcase" : "Add to showcase",
          onClick: onShowcaseClick,
        },
        {
          label: reorderLabel,
          onClick: onReorderClick,
        },
        {
          label: "Delete",
          onClick: onDeleteClick,
        },
      ].filter((o): o is ContextMenuOption => !!o.onClick)}
    />
  );
};
