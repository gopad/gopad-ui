import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Foot from '@/components/foot/index.vue';

describe('Foot.vue', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(Foot);
    expect(wrapper.text()).to.include('Copyright');
  });
});
