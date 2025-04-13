import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UseraccountComponent } from '../useraccount/useraccount.component';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink,UseraccountComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
