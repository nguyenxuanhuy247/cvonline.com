import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
// import { Button } from 'reactstrap';
import Button from '~/components/Button/Button.js';

import getCroppedImg from './cropImage';
import { styles } from './styles';

const Crop = ({ classes, onClose, onGetUrl, src, round = false }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const getCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(src, croppedAreaPixels, rotation);
            onGetUrl(croppedImage);
        } catch (e) {
            console.error(e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src, croppedAreaPixels, rotation]);

    return (
        <div>
            <div className={classes.cropContainer}>
                <Cropper
                    image={src}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={4 / 3}
                    cropShape={round ? 'round' : 'react'}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className={classes.controls}>
                <div className={classes.sliderContainer}>
                    <span className={classes.sliderLabel}>Zoom</span>
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        classes={{ root: classes.slider }}
                        onChange={(e, zoom) => setZoom(zoom)}
                    />
                </div>
                <div className={classes.sliderContainer}>
                    <span className={classes.sliderLabel}>Rotation</span>
                    <Slider
                        value={rotation}
                        min={0}
                        max={360}
                        step={1}
                        aria-labelledby="Rotation"
                        classes={{ root: classes.slider }}
                        onChange={(e, rotation) => setRotation(rotation)}
                    />
                </div>
                <div className={classes.actions}>
                    <Button className={`${classes.button}`} onClick={onClose}>
                        Hủy
                    </Button>
                    <Button className={`${classes.button}  ${classes.finish}`} onClick={() => getCroppedImage()}>
                        Hoàn thành
                    </Button>
                </div>
            </div>
        </div>
    );
};

const StyledCrop = withStyles(styles)(Crop);
export default StyledCrop;
