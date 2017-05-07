<template>
 <md-card class="upload-card tagging-image-container" >
 <div class="dropzone" @drop="handleDrop($event)" @dragover="handleDrag($event)" @dragend="handleDragEnd($event)" @click="openFileDialog">
    <md-icon class="md-primary md-size-4x">file_upload</md-icon>
    <div>Drop files / Click here to upload</div>  
 </div>
  <input class="filedialog-input" type="file" multiple @change="onFileChange" ref="fileinput" accept="image/jpeg, image/png">
 </md-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'upload-card',
  data() {
    return {
      // uniqueId: `dropbzone-${randomString(10)}`,
    }
  },
  methods: {
    ...mapActions(['uploadImage']),
    onFileChange(event) {
      const { target } = event
      console.log(event.target.files)
      const filelist = target.files
      for (let i = 0; i < filelist.length; i++) {
        this.uploadImage(filelist[i])
      }
      target.value = ''
    },
    openFileDialog() {
      this.$refs.fileinput.click()
    },
    handleDrop(ev) {
      console.log('Drop')
      ev.preventDefault()
      // If dropped items aren't files, reject them
      const dt = ev.dataTransfer
      if (dt.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < dt.items.length; i++) {
          if (dt.items[i].kind === 'file') {
            const f = dt.items[i].getAsFile()
            this.uploadImage(f)
            console.log(`... file[${i}].name = ${f.name}`)
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < dt.files.length; i++) {
          this.uploadImage(dt.files[i])
          console.log(`... file[${i}].name = ${dt.files[i].name}`)
        }
      }
    },
    handleDrag(ev) {
        // Prevent default select and drag behavior
      ev.preventDefault()
    },
    handleDragEnd(ev) {
      console.log('dragEnd')
      // Remove all of the drag data
      const dt = ev.dataTransfer
      if (dt.items) {
        // Use DataTransferItemList interface to remove the drag data
        for (let i = 0; i < dt.items.length; i++) {
          dt.items.remove(i)
        }
      } else {
        // Use DataTransfer interface to remove the drag data
        ev.dataTransfer.clearData()
      }
    },
  },
}
</script>

<style>
.dropzone {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  height:100%;
}
.dropzone i {
  margin: initial;
}
.filedialog-input {
  display: none;
  width: 0px;
  height: 0px;
}
.upload-card {
  width: 100%;
}
</style>
