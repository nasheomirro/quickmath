<script lang="ts">
	import { createSettingStore, setSettingStore } from "./settings";

  const settingStore = createSettingStore();
  setSettingStore(settingStore);
</script>

<slot />