import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() =>TextEditorComponent), multi: true }
  ]
})
export class TextEditorComponent implements ControlValueAccessor{

  constructor() { }
  formValue = ``
  selections = ``
  onChange: any = (_:any) => {};
  onTouch: any = (_:any) => {};
  writeValue(obj: any): void {
    this.formValue = obj || ''
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn; 
  }

  setDisabledState?(isDisabled: boolean): void {
    
  }

  applyCommand(command: string) {
    if (command === 'createLink') {
      const url = prompt('Enter the URL');
      if (url) {
        document.execCommand(command, true, url);
      }
    } else {
      console.log(`Applying command: ${command}`);
      console.log(window.getSelection())
      document.execCommand(command, false);
    }
    this.onChange(this.formValue)
    console.log(this.formValue);
  }

  onMouseUp(event: MouseEvent) {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const selectedText = selection.toString();
      console.log('Selected text:', selectedText);
    }
  }
  onInput(event: Event) {
    const target = event.target as HTMLElement;
    this.formValue = target.innerHTML;
    this.onChange(this.formValue);
  }
}
