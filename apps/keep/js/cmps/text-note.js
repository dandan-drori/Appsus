export default {
  props: ['note'],
  template: `
        <div class="text-note">
            <h3>text note</h3>
            <p>{{note.info.txt}}</p>
        </div>
    `,
};
