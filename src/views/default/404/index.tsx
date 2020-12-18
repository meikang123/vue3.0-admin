import { defineComponent } from 'vue';
import S404 from './index.module.scss';

export default defineComponent({
  name: '404',

  setup() {
    const message = '这个页面你不能进......';
    const img_404 = require('@/assets/404_images/404.png');
    const img_404_cloud = require('@/assets/404_images/404_cloud.png');

    return () => (
      <div class={S404.app404}>
        <div class={S404.wscnHttp404}>
          <div class={S404.pic404}>
            <img class="pic-404__parent" src={img_404} alt="404" />
            <img class="pic-404__child left" src={img_404_cloud} alt="404" />
            <img class="pic-404__child mid" src={img_404_cloud} alt="404" />
            <img class="pic-404__child right" src={img_404_cloud} alt="404" />
          </div>
          <div class={S404.bullshit}>
            <div class="bullshit__oops">OOPS!</div>
            <div class="bullshit__headline">{ message }</div>
            <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
            <a href="/" class="bullshit__return-home">返回首页</a>
          </div>
        </div>
      </div>
    );
  }
});
