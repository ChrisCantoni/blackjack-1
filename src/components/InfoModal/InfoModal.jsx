import { Stack } from '@mui/material'

function InfoModal({closeModal}) {

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === 'modal-container') closeModal();
        }}>
            <div className="modal">
                <Stack>
                This modal will teach you how to play the game.
                </Stack>
            </div>
        </div>
    )
}

export default InfoModal;