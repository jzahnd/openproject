// -- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
// ++

import {WorkPackageEditFormController} from "./../wp-edit-form.directive";
import {WorkPackageEditFieldService} from "./wp-edit-field.service";
import {Field} from "./wp-edit-field.module";


export class WorkPackageEditFieldController {
  public formCtrl:WorkPackageEditFormController;
  public fieldName:string;
  public field:Field;
  public errorenous:boolean;

  protected _active:boolean = false;

  constructor(protected wpEditField:WorkPackageEditFieldService, protected $element) {
  }

  public get workPackage() {
    return this.formCtrl.workPackage;
  }

  public get active() {
    return this._active;
  }

  public submit() {
    this.formCtrl.updateWorkPackage()
      .then(() => this.deactivate());
  }

  public activate() {
    this.setupField().then(() => {
      this._active = this.field.schema.writable;
    });
  }

  public get isEditable():boolean {
    return this.workPackage.isEditable;
  }

  public deactivate():boolean {
    return this._active = false;
  }

  public setErrorState(error = true) {
    this.errorenous = error;
    this.$element.toggleClass('-error', error)
  }

  protected setupField():ng.IPromise<any> {
    return this.formCtrl.loadSchema().then(schema => {
      this.field = this.wpEditField.getField(
        this.workPackage, this.fieldName, schema[this.fieldName]);
    });
  }
}

function wpEditFieldLink(scope, element, attrs, controllers:[WorkPackageEditFormController, WorkPackageEditFieldController]) {

  controllers[1].formCtrl = controllers[0];
  controllers[1].formCtrl.fields[scope.vm.fieldName] = scope.vm;

  element.click(event => {
    event.stopImmediatePropagation();
  });

  // Mark the td field if it is inline-editable
  // We're resolving the non-form schema here since its loaded anyway for the table
  scope.vm.formCtrl.loadSchema().then(schema => {
    if (schema[scope.vm.fieldName].writable) {
      element.addClass('-editable');
    }
  })

  element.addClass(scope.vm.fieldName);
}

function wpEditField() {
  return {
    restrict: 'A',
    templateUrl: '/components/wp-edit/wp-edit-field/wp-edit-field.directive.html',
    transclude: true,

    scope: {
      fieldName: '=wpEditField'
    },

    require: ['^wpEditForm', 'wpEditField'],
    link: wpEditFieldLink,

    controller: WorkPackageEditFieldController,
    controllerAs: 'vm',
    bindToController: true
  };
}

//TODO: Use 'openproject.wpEdit' module
angular
  .module('openproject')
  .directive('wpEditField', wpEditField);