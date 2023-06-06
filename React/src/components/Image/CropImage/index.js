import React, { useState, useCallback } from 'react';
import classnames from 'classnames/bind';
import Slider from '@mui/material/Slider';
import Cropper from 'react-easy-crop';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import getCroppedImg from './cropImage.js';
import styles from './index.module.scss';

const cx = classnames.bind(styles);

const Crop = ({ isCrop, onGetUrl, src, round = false }) => {
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
        } catch (error) {
            console.error('An error occurs in CropImageModal.js: ', error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src, croppedAreaPixels, rotation]);

    if (isCrop) {
        console.log('is here');
        getCroppedImage();
    }
    return (
        <div>
            <Stack className={cx('crop-container')}>
                <Cropper
                    image={src}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={4 / 3}
                    cropShape={round ? 'round' : 'react'}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                />
            </Stack>
            <Stack className={cx('slider-container')}>
                <Stack className={cx('stack')}>
                    <Typography className={cx('label')} variant="span">
                        Zoom
                    </Typography>
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e, zoom) => setZoom(zoom)}
                        className={cx('slider')}
                    />
                </Stack>
                <Stack className={cx('stack')}>
                    <Typography className={cx('label')} variant="span">
                        Rotation
                    </Typography>
                    <Slider
                        value={rotation}
                        min={0}
                        max={360}
                        step={1}
                        defaultValue={0}
                        aria-labelledby="Rotation"
                        onChange={(e, rotation) => setRotation(rotation)}
                        className={cx('slider')}
                    />
                </Stack>
            </Stack>
        </div>
    );
};

export default Crop;
