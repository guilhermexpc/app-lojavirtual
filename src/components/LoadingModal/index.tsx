import React from 'react';
import { Modal } from 'react-native';
import { LoadingIndicator } from '../LoadingIndicator';

import {
  Container
} from './styles';

interface Props {
  modalVisible: boolean
  setModalVisible: (modalVisible: boolean) => void;
}

export function LoadingModal({modalVisible, setModalVisible}: Props){
  return (    
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
      }}>
        <Container>
          <LoadingIndicator />        
        </Container>
      </Modal>
  );
}