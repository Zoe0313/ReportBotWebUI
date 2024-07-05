import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl,FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: 'profile-editor.component.html',
  styleUrls: ['profile-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEditorComponent {
  // 当需要与多个表单打交道时，手动创建多个表单控件实例会非常繁琐。FormBuilder 服务提供了一些便捷方法来生成表单控件。
  //FormBuilder 在幕后也使用同样的方式来创建和返回这些实例，只是用起来更简单。
  constructor(private fb: FormBuilder) {}
  // 在上面的例子中，你可以使用 group() 方法，用和前面一样的名字来定义这些属性。
  // 这里，每个控件名对应的值都是一个数组，这个数组中的第一项是其初始值。
  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    // FormArray 是 FormGroup 之外的另一个选择，用于管理任意数量的匿名控件。无需给控件设置key
    // 你也可以往 FormArray 中动态插入和移除控件，
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  //访问FormArray控件
  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }
  addAlias() {
    this.aliases.push(this.fb.control(''));
  }
  onSubmit() {
    console.warn(this.profileForm.value);
    console.warn(this.profileForm.get('firstName')!.value);
  }

  updateProfile() {
    // patchValue可以更新表单的部分数据
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

}
