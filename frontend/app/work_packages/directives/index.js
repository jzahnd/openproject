//-- copyright
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
//++

angular.module('openproject.workPackages.directives')
  .directive('langAttribute', require('./lang-attribute-directive'))
  .directive('queryColumns', [
    'WorkPackagesTableHelper',
    'WorkPackagesTableService',
    'WorkPackageService',
    'QueryService', require('./query-columns-directive')
  ])
  .directive('queryFilter', [
    'WorkPackageLoadingHelper',
    'QueryService',
    'PaginationService',
    'I18n',
    'OPERATORS_NOT_REQUIRING_VALUES',
    '$timeout',
    '$animate', require('./query-filter-directive')
  ])
  .constant('ADD_FILTER_SELECT_INDEX', -1)
  .directive('queryFilters', [
    '$timeout',
    'FiltersHelper',
    'I18n',
    'ADD_FILTER_SELECT_INDEX', require('./query-filters-directive')
  ])
  .directive('queryForm', require('./query-form-directive'))
  .constant('PERMITTED_MORE_MENU_ACTIONS', [
    { key: 'log_time', link: 'logTime', resource: 'workPackage' },
    { key: 'move', link: 'move', resource: 'workPackage' },
    { key: 'delete', link: 'delete', resource: 'workPackage' },
    { key: 'copy', link: 'createWorkPackage', resource: 'project' }
  ])
  .directive('workPackageDetailsToolbar', [
    'PERMITTED_MORE_MENU_ACTIONS',
    '$state',
    '$window',
    '$location',
    'I18n',
    'HookService',
    'WorkPackageService',
    'WorkPackageAuthorization',
    require('./work-package-details-toolbar-directive')
  ])
  .directive('workPackageDynamicAttribute', ['$compile', require(
    './work-package-dynamic-attribute-directive')])
  .directive('workPackageAttachments', [
    'WorkPackageAttachmentsService',
    'NotificationsService',
    'I18n',
    'ConfigurationService',
    'ConversionService',
    'FocusHelper',
    require('./work-package-attachments-directive')
  ])
  .directive('workPackageWatcher', [
    'I18n',
    require('./work-package-watcher-directive')
  ])
  .directive('workPackageWatchersLookup', [
    'I18n',
    'FocusHelper',
    require('./work-package-watchers-lookup-directive.js')
  ]);
