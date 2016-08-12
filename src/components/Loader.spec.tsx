import * as React from 'react';
import { shallow } from 'enzyme';

import { expect } from '../__test__/configureExpect';
import { TestMode } from 'radium';

import { Loader, LoaderBase } from './Loader';

describe('Loader', function() {
  beforeEach(function() {
    TestMode.clearState();
  });

  afterEach(function() {
    TestMode.clearState();
  });

  context('when showUntil is false', function() {
    it('shows a loading circle', function() {
      const element = shallow(<LoaderBase showUntil={false}><dl /></LoaderBase>);
      expect(element.contains(<dl />)).to.be.false;
    });
  });

  context('when showUntil is true', function() {
    it('shows children', function() {
      const element = shallow(<Loader showUntil={true}><dl /></Loader>);
      expect(element.contains(<dl />)).to.be.true;
    });
  });
});
