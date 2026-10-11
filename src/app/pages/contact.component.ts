import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <main class="max-w-3xl mx-auto px-6 py-10 w-full">
      <section class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Contacto</h1>
        <p class="text-sm text-gray-500 mt-3">¿Tienes alguna pregunta o comentario? Escríbenos y nos pondremos en contacto contigo.</p>
      </section>
      <section class="bg-white border border-gray-200 rounded-md shadow-sm p-6">
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="mb-5">
            <label for="nombre" class="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
            <input id="nombre" formControlName="nombre" placeholder="Escribe tu nombre" class="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            @if (form.controls.nombre.touched && form.controls.nombre.invalid) {
              <p class="text-red-500 text-xs mt-1">El nombre es obligatorio.</p>
            }
          </div>
          <div class="mb-5">
            <label for="correo" class="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico</label>
            <input id="correo" type="email" formControlName="correo" placeholder="ejemplo@correo.com" class="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            @if (form.controls.correo.touched && form.controls.correo.invalid) {
              <p class="text-red-500 text-xs mt-1">Ingresa un correo electrónico válido.</p>
            }
          </div>
          <div class="mb-5">
            <label for="asunto" class="block text-sm font-semibold text-gray-700 mb-2">Asunto</label>
            <input id="asunto" formControlName="asunto" placeholder="Asunto del mensaje" class="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            @if (form.controls.asunto.touched && form.controls.asunto.invalid) {
              <p class="text-red-500 text-xs mt-1">El asunto es obligatorio.</p>
            }
          </div>
          <div class="mb-5">
            <label for="mensaje" class="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
            <textarea id="mensaje" formControlName="mensaje" rows="5" placeholder="Escribe tu mensaje..." class="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500"></textarea>
            @if (form.controls.mensaje.touched && form.controls.mensaje.invalid) {
              <p class="text-red-500 text-xs mt-1">El mensaje es obligatorio.</p>
            }
          </div>
          <button type="submit" class="bg-blue-600 text-white text-sm px-5 py-2 rounded hover:bg-blue-700 transition">Enviar mensaje</button>
        </form>
      </section>
    </main>

    @if (modalMessage) {
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4" (click)="closeModal()" (keydown.escape)="closeModal()">
        <section role="dialog" aria-modal="true" aria-labelledby="modal-title" class="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center" (click)="$event.stopPropagation()">
          <div class="text-4xl mb-4">{{ modalSuccess ? '✓' : '⚠️' }}</div>
          <h2 id="modal-title" class="text-lg font-bold text-gray-800 mb-2">{{ modalTitle }}</h2>
          <p class="text-sm text-gray-600 mb-6">{{ modalMessage }}</p>
          <button type="button" (click)="closeModal()" [class]="modalSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'" class="text-white px-5 py-2 rounded transition">Cerrar</button>
        </section>
      </div>
    }
  `,
})
export class ContactComponent {
  private readonly formBuilder = inject(FormBuilder);
  readonly form = this.formBuilder.nonNullable.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    asunto: ['', Validators.required],
    mensaje: ['', Validators.required],
  });
  modalTitle = '';
  modalMessage = '';
  modalSuccess = false;

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.modalTitle = '¡Mensaje enviado correctamente!';
    this.modalMessage = 'Gracias por contactarnos. Hemos recibido tu mensaje correctamente.';
    this.modalSuccess = true;
    this.form.reset();
  }

  closeModal(): void {
    this.modalMessage = '';
  }
}
